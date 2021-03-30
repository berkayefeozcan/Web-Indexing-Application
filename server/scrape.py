import requests
from bs4 import BeautifulSoup
import operator
from collections import Counter
from anytree import AnyNode, Node
from anytree.exporter import JsonExporter
import time
import concurrent.futures
from threading import Thread
from nltk.corpus import wordnet as wn
from nltk.corpus import stopwords 

class Crawler :
    def __init__(self):
        self.resultArr = []
        self.isSemantic = False
   
    def setIsSemantic(self,value):
        self.isSemantic = value

    def GetWordsFromUrl(self,url):
        my_wordlist = []
        my_source_code = requests.get(url).text
        my_soup = BeautifulSoup(my_source_code, 'html.parser')

        content = my_soup.get_text()
        words = content.lower().split()

        for each_word in words:
            my_wordlist.append(each_word)

        return self.clean_wordlist(my_wordlist)


    def CalculateFrequency(self,url):
        wordList = self.GetWordsFromUrl(url)
        result = self.CreateDictionary(wordList, False,ratio=1)
        # print(result)
        return result


    # ister 2 icin kullanilan fonksiyon
    def FindKeywords(self,url, keywordAmount):
        try:
            r= requests.get(url)
            my_source_code = r.text
            my_soup = BeautifulSoup(my_source_code, 'html.parser')
        except :
            return Counter({}).most_common(keywordAmount)
            
        metaTags = []
        hTags = {}
        title = my_soup.find('title')
        ogTitle = my_soup.find('meta', property='og:title')
        ogDescription = my_soup.find('meta', property='og:description')
        nameDescription = my_soup.find('meta', attrs={'name': 'description'})
        # find all p tag text without getting its subsequent tag like script, a tags.
        whitelist = ['p']
        pTag_text = [t for t in my_soup.find_all(text=True) if t.parent.name in whitelist]
        pTag_list = []
        for item in pTag_text:
            pTag_list += item.lower().split()

        try:
            titleWords = title.text.lower().split() if title!=None else []
            titleWords += ogTitle['content'].lower().split() if ogTitle != None else []
            metaTags += ogDescription['content'].lower(
            ).split() if ogDescription != None else []
            metaTags += nameDescription['content'].lower(
            ).split() if nameDescription != None else []
        except Exception:
            pass

        tagNames = ['h1', 'h2', 'h3','h4','h5','h6']
        for tag in tagNames:
            result = my_soup.find_all(tag)
            if result != None:
                hTags[tag] = []
                for i in result:
                    hTags[tag] += i.text.lower().split()
        # print(titleWords)
        # print(metaTags)
        # print(hTags)

        # counting all word frequency for per tag with their ratio values respectively
        resultDic = {}
        resultDic = self.countWords(titleWords, {}, ratio=11)
        resultDic = self.countWords(metaTags, resultDic, 7)

        for i, tName in enumerate(tagNames):
            resultDic = self.countWords(hTags[tName], resultDic, 6-i)

        resultDic = self.countWords(pTag_list, resultDic, 1)  

        return Counter(resultDic).most_common(keywordAmount)


    # Function removes any unwanted symbols
    def clean_wordlist(self,wordlist):
        clean_list = []
        stop_words = (stopwords.words('english')) #ntlk stopwords library
        stop_words += (stopwords.words('turkish'))
        # filters word according to strig length
        wordlist  = [word for word in wordlist if word.lower() not in stop_words and len(word) > 2]
        for word in wordlist:
            symbols = '-0123456789!@$%^&*()_+={[}]|\;:"<>?/., x\\'
            for i in range(0, len(symbols)):
                word = word.replace(symbols[i], '')
            if len(word) > 0:
                clean_list.append(word)
        return clean_list


    def CreateDictionary(self,clean_list, isKeyword, word_count={}, ratio=0):
        word_count = {}
        for word in clean_list:
            if word in word_count:
                word_count[word] += ratio
            else:
                word_count[word] = ratio

        # returns the most occurring elements
        c = Counter(word_count)
        if isKeyword:
            top = c.most_common(5)
            return top
        else:
            top = c.most_common(len(word_count))
            return top

    # count given list words and add them given dictionary object
    def countWords(self,wordList,word_count, ratio=1):
        clean_list = self.clean_wordlist(wordList)
        for word in clean_list:
            if word in word_count:
             word_count[word][1] += ratio
             word_count[word][0] += 1
            else:
                word_count[word] = [1,ratio]

        return word_count

    # calculation similarity
    def FindSimilarity(self,keywords1, keywords2):
        resultDic = {}
        resultDic['wordCounts']={}
        resultDic['synonymWords']={}
        resultDic['score'] = 1
        
        score = 0
        sum = 0
        for keyWord in keywords1:
            try:
                if self.isSemantic : synonymWords = self.FindSynonymsWordsGivenParameterWord(keyWord[0])
            except Exception:
                continue

            for word in keywords2:
                sum += word[1][1]
                if keyWord[0] == word[0]:
                    resultDic['wordCounts'][word[0]] = word[1][1]
                    score += word[1][1]
                try:
                    if self.isSemantic:
                    # print(f'word2: {word[0]}')
                        if len(synonymWords) > 0:
                            for synWord in synonymWords:
                                if synWord == word[0]:
                                    resultDic['synonymWords'][keyWord[0]] = word[0]
                                    score += word[1][1]
                except Exception:
                    continue
                

        resultDic['score'] = (score/sum) if sum!=0 else 0
        return resultDic

    def FindSynonymsWordsGivenParameterWord(self,word):
        
        SynonymsWordList=[]
        for syn in wn.synsets(word):
                        for l in syn.lemmas():
                            if l.name() !=word:
                                SynonymsWordList.append(l.name())
        
        uniqueList=self.unique(SynonymsWordList)
        # for synonymsWord in SynonymsWordList:
        #     if not wn.synsets(synonymsWord):
        #         uniqueList.remove(synonymsWord)
        # print(uniqueList)
        return uniqueList

    # function to get unique values
    def unique(self,list1):
        unique_list = []
        for x in list1:
            if x not in unique_list:
                unique_list.append(x)
        return unique_list

    def getLinksFromAWebSite(self,url,chosenUrl):
        links = []
        my_source_code = requests.get(url).text
        soup = BeautifulSoup(my_source_code, 'html.parser')

        for aTag in soup.find_all('a', href=True):
            link = aTag['href']
            if link.startswith("http") and link not in chosenUrl:
                links.append(link)            
        return links


    def bubbleSort(self,arr):
        n = len(arr)
        for i in range(n-1):
            for j in range(0, n-i-1):
                if arr[j]['score'] < arr[j+1]['score'] :
                    arr[j], arr[j+1] = arr[j+1], arr[j]

    def IndexWebSite(self,url, urlSet,depth, urlAmount,flag=False):
        print("indexleme basladi")
        keywords = self.FindKeywords(url, 5)
        print(keywords)
        if(len(keywords)==0) : return []   
        threads = []
        self.resultArr= []
        wn.ensure_loaded()
        for i in range(len(urlSet)):
            t =Thread(target=self.IndexSiteWithThread, args=(urlSet[i],depth,urlAmount,keywords))
            t.start()
            threads.append(t)

        for  thread in threads:
            thread.join()

        self.bubbleSort(self.resultArr)    
        return self.resultArr

# used one thread while using indexing per site
    def IndexSiteWithThread(self,url, depht, urlAmount, keywords):

        exporter = JsonExporter(indent=10, sort_keys=True)
        resultDic={}
        resultDic['urlName'] = url
        keywords2= self.FindKeywords(url,10)
        if(len(keywords2)==0) :
            return 
        similartyDic = self.FindSimilarity(keywords, keywords2)
        kwf= similartyDic['wordCounts']
        resultDic['score'] = similartyDic['score']
        root = None
        if self.isSemantic : 
                print('calisiyor aga')
                root  = AnyNode(urlName=url, kwf=kwf,synonymWords=similartyDic['synonymWords'])
        else : 
                root = AnyNode(urlName=url, kwf=kwf) 
        root = self.createKeywordFrequancyTree(root, root, depht, 0, keywords, url,urlAmount,resultDic,[])
        resultDic['tree'] = exporter._export(root)
        self.resultArr.append(resultDic)


    def createKeywordFrequancyTree(self,root, parent, stoperIndex, deep, keywords, iterationUrl, urlAmount,resultDic,chosenUrl):
        # bu fonkisyon verilen url in alt urllerine bakarak skor hesaplar
        if stoperIndex == deep:
            return root
        urlList = self.getLinksFromAWebSite(iterationUrl,chosenUrl)[0:urlAmount]
        chosenUrl += urlList
        for url in urlList:
            keywords2 = self.FindKeywords(url, 10)
            similartyDic = self.FindSimilarity(keywords, keywords2)
            kwf= similartyDic['wordCounts']
            resultDic['score'] += (similartyDic['score'] /(deep+2))
            if self.isSemantic : 
                newParent =AnyNode(urlName=url, kwf=kwf, parent=parent,synonymWords=similartyDic['synonymWords'])
            else : 
                newParent = AnyNode(urlName=url, kwf=kwf, parent=parent) 

            newDeep = deep+1
            self.createKeywordFrequancyTree(
                root, newParent, stoperIndex, newDeep, keywords, url, urlAmount,resultDic,chosenUrl)
        return root
