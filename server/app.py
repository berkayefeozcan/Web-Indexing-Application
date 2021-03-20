from flask import Flask
from flask import request, jsonify, make_response
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
@app.route('/')
def index():
    return jsonify(username="ali",
                   email="deneme@gmail.com",
                   id=[1,2,3,4,5,6,7,8,9])

@app.route('/calculateFrequeny', methods=['GET'])
def a():
    givenUrl = request.args.get('givenUrl')
    wordArray= [{"name":"deneme","repeatAmount":10}]
    res = make_response(jsonify({"message": "OK" , "wordArray":wordArray}), 200)
    return res

if __name__ == "__main__":
    app.run(debug=True)
