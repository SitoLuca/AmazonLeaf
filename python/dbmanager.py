import sqlite3
from flask import Flask, request, jsonify

api_port = 5000
api_host = '127.0.0.1'
app = Flask(__name__)

db = sqlite3.connect('../DB/amazonleafdb.sqlite')  # connect db
cursor = db.cursor()

@app.route('/login', methods=['POST'])
def loginendpoint():
    data = request.get_json()
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True, host=api_host, port=api_port)
