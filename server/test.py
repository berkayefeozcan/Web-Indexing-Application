from nltk.corpus import stopwords 
from nltk.tokenize import word_tokenize 
  
example_sent = """This is a sample sentence,
                  showing off the stop words filtration."""
  
stop_words = (stopwords.words('english')) 
stop_words += (stopwords.words('turkish'))
# print(stop_words)
word_tokens = word_tokenize(example_sent)
filtered_sentence = [w for w in word_tokens if not w in stop_words] 
  
filtered_sentence = [] 
  
for w in word_tokens: 
    if w not in stop_words: 
        filtered_sentence.append(w) 
  
print(word_tokens) 
print(filtered_sentence) 