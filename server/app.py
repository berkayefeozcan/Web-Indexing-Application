from flask import Flask
from flask import request, jsonify, make_response
from flask_cors import CORS
from scrape import CalculateFrequency, FindKeywords, CalculateSimilarity

app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return jsonify("This is Home page")

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
        res = make_response(jsonify({"message": "OK" , "result":result}), 200)
    except:
        res = make_response(jsonify({"message":"error"}), 404)
    return res


if __name__ == "__main__":
    app.run(debug=True)
