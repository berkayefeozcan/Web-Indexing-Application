import requests 
from bs4 import BeautifulSoup
import operator
from collections import Counter
from anytree import AnyNode
from anytree.exporter import JsonExporter
def GetWordsFromUrl(url):
   my_wordlist = []
   my_source_code = requests.get(url).text
   my_soup = BeautifulSoup(my_source_code, 'html.parser')

   content = my_soup.get_text()
   words = content.lower().split()

   for each_word in words:
      my_wordlist.append(each_word)
      
   return clean_wordlist(my_wordlist)


def CalculateFrequency(url):
   wordList = GetWordsFromUrl(url) 
   return CreateDictionary(wordList, False)

#ister 2 icin kullanilan fonksiyon
def FindKeywords(url): 
   wordList = GetWordsFromUrl(url)
   return CreateDictionary(wordList, True)
   


# Function removes any unwanted symbols
def clean_wordlist(wordlist):
   clean_list =[]
   for word in wordlist: 
      symbols = '!@#$%^&*()_-+={[}]|\;:"<>?/., '
      for i in range (0, len(symbols)):
         word = word.replace(symbols[i], '')
      if len(word) > 0:
         clean_list.append(word)
   return clean_list


def CreateDictionary(clean_list, isKeyword):
   word_count = {}
   for word in clean_list:
      if word in word_count:
         word_count[word] += 1
      else:
         word_count[word] = 1
   
   # returns the most occurring elements
   c = Counter(word_count)
   if isKeyword:
      top = c.most_common(5)
      return top
   else:
      top = c.most_common(len(word_count))
      return top


#calculation similarity
def CalculateSimilarity(givenUrl1, givenUrl2):
   url1Keywords = FindKeywords(givenUrl1)
   url2Keywords = FindKeywords(givenUrl2)
   url2Freq = CalculateFrequency(givenUrl2)
   similarityScore = FindSimilarityScore(url1Keywords, url2Freq)
   print(similarityScore)
   return {"url1Keywords": url1Keywords, "url2Keywords": url2Keywords, "similarityScore": similarityScore}


def FindSimilarityScore(listOfKeyword, listOfPerWord):
   resultDic ={}
   resultDic['wordCounts'] = {}
   score = 1
   for keyWord in listOfKeyword:
      for word in listOfPerWord:
         if keyWord[0] == word[0]:
            resultDic['wordCounts'][word[0]] = word[1]
            score += word[1]
   # kendimce optimize ettim
   resultDic['score'] = 1
   return resultDic

def getLinksFromAWebSite(url):
   links = []
   my_source_code = requests.get(url).text
   soup = BeautifulSoup(my_source_code, 'html.parser')
  
   for aTag in soup.find_all('a', href=True):
      link = aTag['href']
      if link.startswith("http") :
         links.append(link)
   return links

def indexWebASite(url,urlSet):
   print("indexleme basladi")
   keywords = FindKeywords(url)
   exporter = JsonExporter(indent=10, sort_keys=True) 
   ''' alinan anahtar kelimesiyle benzerlik orani hesaplanip
       bir siralama yapilacak.
    '''
   resultArr =[]
   for i in urlSet : 
      kwf=  FindSimilarityFreqWithKeys(keywords,i)['wordCounts']
      root = AnyNode(urlName=url,kwf=kwf)
      result = createKeywordFrequancyTree(root,root,3,0,keywords,i)
      print(exporter.export(result))
      resultArr.append(result)
      return exporter._export(result)

def FindSimilarityFreqWithKeys(keywordArr, url):
        
   freq = CalculateFrequency(url)
   return FindSimilarityScore(keywordArr,freq)
   
   # return exporter._export(root)
  
       
def createKeywordFrequancyTree(root,parent,stoperIndex,deep,keywords,iterationUrl):
   # bu fonkisyon verilen url in alt urllerine bakarak skor hesaplar
   if stoperIndex == deep:
      return root
   urlList = getLinksFromAWebSite(iterationUrl)[0:4]
   for url in urlList:
      kwf = FindSimilarityFreqWithKeys(keywords,url)['wordCounts']
      newParent = AnyNode(urlName=url,kwf=kwf,parent=parent)
      newDeep = deep+1
      createKeywordFrequancyTree(root,newParent,stoperIndex,newDeep,keywords,url)
   return root

#getLinksFromAWebSite("http://bilgisayar.kocaeli.edu.tr/duyurular.php")
# indexWebASite("https://www.w3schools.com/python/ref_func_round.asp",["https://www.journaldev.com/33185/python-add-to-array"])     
   

   

