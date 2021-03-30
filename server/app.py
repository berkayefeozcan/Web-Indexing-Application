from flask import Flask
from flask import request, jsonify, make_response
from flask_cors import CORS
import scrape 
import json 

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
  return (jsonify("welcome my world"))

@app.route('/calculateFrequeny', methods=['GET'])
def CalculateFreq():
  
    try:
      givenUrl = []
      givenUrl = request.args.get('givenUrl')
      print(givenUrl) 
      result = scrape.CalculateFrequency(givenUrl)
      print(result)
      res = make_response(jsonify({"message": "OK" , "wordArray":result}), 200)
    except :
      res = make_response(jsonify({"message": "eroor"}), 404)
    return res


@app.route('/findKeywords', methods=['GET'])
def FindKeyw():
    givenUrl = request.args.get('givenUrl') 
    try:
      result = scrape.FindKeywords(givenUrl)
      res = make_response(jsonify({"message": "OK" , "wordArray":result}), 200)
    except :
      res = make_response(jsonify({"message": "eroor"}), 404)   
    return res


@app.route('/CalculateSimilarity', methods=['GET'])
def CalculateSim():
    givenUrlOne = request.args.get('givenUrlOne')
    givenUrlTwo = request.args.get('givenUrlTwo') 
    try:
        url1Keywords= scrape.FindKeywords(givenUrlOne,5)
        url2Keywords = scrape.FindKeywords(givenUrlTwo,5)
        similarityScore = scrape.FindSimilarity(url1Keywords, url2Keywords)
        result = {"url1Keywords": url1Keywords, "url2Keywords": url2Keywords, "similarityScore": similarityScore}
        res = make_response(jsonify({"message": "OK" , "result":result}), 200)
    except:
        res = make_response(jsonify({"message":"error"}), 404)
    return res

@app.route('/indexAndSort', methods=['POST'])
def indexAndSort():
  try:
    reqBody = request.get_json()
    baseUrl = reqBody['baseUrl']
    urlSet= reqBody['urlSet']

    resultArr =  scrape.IndexWebSite(baseUrl,urlSet,3,2) 
    res = make_response(jsonify({"message":"success","result":resultArr}), 200)
  except:
    res = make_response(jsonify({"message":"error"}), 404)
  return res

@app.route('/semanticAnalyes', methods=['POST'])
def semanticAnalyes():
  try :
    reqBody = request.get_json()
    baseUrl = reqBody['baseUrl']
    urlSet= reqBody['urlSet']
    scrape.setIsSemantic(True)
    resultArr =  scrape.IndexWebSite(baseUrl,urlSet,3,2) 
    res = make_response(jsonify({"message":"success","result":resultArr}), 200)
  except:
    res = make_response(jsonify({"message":"error"}), 404)
  return res

if __name__ == "__main__":
    app.run(debug=True)

