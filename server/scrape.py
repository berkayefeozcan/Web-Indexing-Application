import requests
from bs4 import BeautifulSoup
import operator
from collections import Counter
from anytree import AnyNode
from anytree.exporter import JsonExporter
import time
import concurrent.futures
from threading import Thread

# gloabal variables
# urlAmount = 23
# depth = 3


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


# ister 2 icin kullanilan fonksiyon
def FindKeywords(url,keywordAmount):
    my_source_code = requests.get(url).text
    my_soup = BeautifulSoup(my_source_code, 'html.parser')
    titleWords = my_soup.find('title').text.lower().split()
    metaTags = []
    hTags = {}
    ogTitle = my_soup.find('meta', property='og:title')
    ogDescription =  my_soup.find('meta',property='og:description')
    nameDescription =my_soup.find('meta',attrs={'name': 'description'})
   #  print(ogTitle['content'].lower().split())
    titleWords += ogTitle['content'].lower().split() if ogTitle!= None  else []
    metaTags +=ogDescription['content'].lower().split() if ogDescription!= None  else []
    metaTags += nameDescription['content'].lower().split() if nameDescription!= None  else []

    tagNames = ['h1', 'h2', 'h3']
    for tag in tagNames:
        result = my_soup.find_all(tag)
        if result != None:
            hTags[tag] = []
            for i in result:
                hTags[tag] += i.text.lower().split()
    # print(titleWords)
    # print(metaTags)
    # print(hTags)
    resultDic = countWords(titleWords,ratio=11)
    resultDic = countWords(metaTags,resultDic,7)

    for i,tName in enumerate( tagNames) :
       resultDic = countWords(hTags[tName],resultDic,6-i)

    return Counter(resultDic).most_common(keywordAmount)


# Function removes any unwanted symbols
def clean_wordlist(wordlist):
    clean_list = []
    stopwords = ['what']

    wordlist  = [word for word in wordlist if word.lower() not in stopwords and len(word)>3]
    for word in wordlist:
        symbols = '0123456789!@#$%^&*()_+={[}]|\;:"<>?/., x\\'
        for i in range(0, len(symbols)):
            word = word.replace(symbols[i], '')
        if len(word) > 0:
            clean_list.append(word)
    return clean_list


def CreateDictionary(clean_list, isKeyword, word_count={}, ratio=1):
   
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


def countWords(wordList,word_count={}, ratio=1):
   clean_list = clean_wordlist(wordList)
   for word in clean_list:
      if word in word_count:
         word_count[word][0] += ratio
         word_count[word][1] += 1
      else:
         word_count[word] = [ratio,1]

   return word_count

# calculation similarity


def CalculateSimilarity(givenUrl1, givenUrl2):
    url1Keywords = FindKeywords(givenUrl1,5)
    url2Keywords = FindKeywords(givenUrl2,10)

    similarityScore = FindSimilarity(url1Keywords, url2Keywords)
    print(similarityScore)
    return {"url1Keywords": url1Keywords, "url2Keywords": url2Keywords, "similarityScore": similarityScore}


def FindSimilarity(keywords1, keywords2):
    resultDic = {}
    resultDic['wordCounts'] = {}
    score = 1
    for keyWord in keywords1:
        for word in keywords2:
            if keyWord[0] == word[0]:
                resultDic['wordCounts'][word[0]] = word[1][1]
                print(word)
                score += word[1][1]
    # kendimce optimize ettim
    resultDic['score'] = 1
    return resultDic


def getLinksFromAWebSite(url):
    links = []
    my_source_code = requests.get(url).text
    soup = BeautifulSoup(my_source_code, 'html.parser')

    for aTag in soup.find_all('a', href=True):
        link = aTag['href']
        if link.startswith("http") and link not in links:
            links.append(link)
    return links



resultArr = []
def indexWebASite(url, urlSet,depth, urlAmount):
    print("indexleme basladi")
    keywords = FindKeywords(url,5)
    
    ''' alinan anahtar kelimesiyle benzerlik orani hesaplanip
       bir siralama yapilacak.
    '''
   #  with concurrent.futures.ThreadPoolExecutor() as executor:
   #    results = executor.map(threading, urlSet)
    threads=[]
    for i in range(len(urlSet)):
      t =Thread(target=threading, args=(urlSet[i],depth,urlAmount,keywords))
      t.start()
      threads.append(t)

    for  thread in threads:
        thread.join()
    
    for r in resultArr :
        f = open("demofile2.txt", "a")
        f.write(f"{r}")
        f.close()
       
    # for res in results:
    #   print(res)
      #   print(exporter.export(result))
      #   resultArr.append(result)
   
   #  return exporter._export(result)

def threading(url, depht, urlAmount, keywords):
   exporter = JsonExporter(indent=10, sort_keys=True)
   keywords2= FindKeywords(url,10)
   kwf = FindSimilarity(keywords, keywords2)['wordCounts']
   root = AnyNode(urlName=url, kwf=kwf)
   result = createKeywordFrequancyTree(root, root, depht, 0, keywords, url,urlAmount)
   resultArr.append(exporter.export(result))



def createKeywordFrequancyTree(root, parent, stoperIndex, deep, keywords, iterationUrl,urlAmount):
    # bu fonkisyon verilen url in alt urllerine bakarak skor hesaplar
    if stoperIndex == deep:
        return root
    urlList = getLinksFromAWebSite(iterationUrl)[0:urlAmount]
    for url in urlList:
        keywords2= FindKeywords(url,10)
        kwf = FindSimilarity(keywords, keywords2)['wordCounts']
        newParent = AnyNode(urlName=url, kwf=kwf, parent=parent)
        newDeep = deep+1
        createKeywordFrequancyTree(root, newParent, stoperIndex, newDeep, keywords, url,urlAmount)
    return root


#FindKeywords("http://bilgisayar.kocaeli.edu.tr/duyurular.php")
#FindKeywords("https://tr.wikipedia.org/wiki/Be%C5%9Fikta%C5%9F-Fenerbah%C3%A7e_derbisi")
start = time.perf_counter()
baseUrl = "https://www.yusufsezer.com.tr/java-thread/"
urlSet=["https://umiitkose.com/2015/04/java-thread-islemleri/",
"https://www.dijitalders.com/icerik/44/5349/java_threading_multithreading.html",
"https://emrahmete.wordpress.com/2011/10/06/javada-thread-yapisi-ve-kullanimi-hakkinda-ipuclari/",
"https://yazdoldur.com/programlama/java/java-thread-kavrami-multithreading-ve-olusturma-yontemleri/",
"https://bilisim.io/2017/01/06/thread-nedir-ve-nasil-tanimlanir/"
]
indexWebASite(baseUrl,urlSet,3,2)
finish = time.perf_counter()
print(f'Finished in {round(finish-start, 2)} second(s)')
