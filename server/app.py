from flask import Flask
from flask import request, jsonify, make_response
from flask_cors import CORS
from scrape import CalculateFrequency, FindKeywords, CalculateSimilarity,indexWebASite
import json 

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
  return (jsonify("welcome my world"))

@app.route('/calculateFrequeny', methods=['GET'])
def CalculateFreq():
    givenUrl = request.args.get('givenUrl') 
    try:
      result = CalculateFrequency(givenUrl)
      res = make_response(jsonify({"message": "OK" , "wordArray":result}), 200)
    except :
      res = make_response(jsonify({"message": "eroor"}), 404)
    return res


@app.route('/findKeywords', methods=['GET'])
def FindKeyw():
    givenUrl = request.args.get('givenUrl') 
    try:
      result = FindKeywords(givenUrl)
      res = make_response(jsonify({"message": "OK" , "wordArray":result}), 200)
    except :
      res = make_response(jsonify({"message": "eroor"}), 404)   
    return res


@app.route('/CalculateSimilarity', methods=['GET'])
def CalculateSim():
    givenUrlOne = request.args.get('givenUrlOne')
    givenUrlTwo = request.args.get('givenUrlTwo') 
    try:
        result = CalculateSimilarity(givenUrlOne, givenUrlTwo)
        print(result)
        res = make_response(jsonify({"message": "OK" , "result":'result'}), 200)
    except:
        res = make_response(jsonify({"message":"error"}), 404)
    return res

@app.route('/indexAndSort', methods=['GET'])
def indexAndSort():
  return ({"result":indexWebASite("https://www.w3schools.com/python/ref_func_round.asp",["https://www.journaldev.com/33185/python-add-to-array"])})

if __name__ == "__main__":
    app.run(debug=True)