import requests
from bs4 import BeautifulSoup
import operator
from collections import Counter

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

