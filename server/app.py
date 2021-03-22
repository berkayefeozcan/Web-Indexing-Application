from flask import Flask
from flask import request, jsonify, make_response
from flask_cors import CORS
from scrape import CalculateFrequency, FindKeywords

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


if __name__ == "__main__":
    app.run(debug=True)
