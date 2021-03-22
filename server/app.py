from flask import Flask
from flask import request, jsonify, make_response
from flask_cors import CORS
from scrape import CalculateFrequency, FindKeywords, CalculateSimilarity

app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return jsonify(username="ali",
                   email="deneme@gmail.com",
                   id=[1,2,3,4,5,6,7,8,9])

@app.route('/calculateFrequeny', methods=['GET'])

def CalculateFreq():
    givenUrl = request.args.get('givenUrl') 
    try:
      result = CalculateFrequency(givenUrl)
      res = make_response(jsonify({"message": "OK" , "wordArray":result}), 200)
    except :
      res = make_response(jsonify({"message": "eroor"}), 404)
    
    return res;


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
    givenUrl1 = request.args.get('givenUrl1')
    givenUrl2 = request.args.get('givenUrl2') 
    
    try:
        print("url1 :"+givenUrl1)
        print("url2 :"+givenUrl2)
        CalculateSimilarity(givenUrl1, givenUrl2)
        res = make_response(jsonify({"message": "OK" , "wordArray":"result"}), 200)
    except:
        res = make_response(jsonify({"message":"error"}), 404)

    return res


if __name__ == "__main__":
    app.run(debug=True)
