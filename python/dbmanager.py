import sqlite3
from flask import Flask, request, jsonify
from flask_cors import CORS

api_port = 8000  # sul Crispy McBacon la porta 5000 e 7000 sono esclusive :-(
api_host = '127.0.0.1'
app = Flask(__name__)
CORS(app, resources={r'*': {'origins': '*'}})

db = sqlite3.connect('../DB/amazonleafdb.sqlite', check_same_thread=False)  # connect db
cursor = db.cursor()

@app.route('/courierHome', methods=['POST'])
def courierhome():
    data = request.get_json()
    sql = f"select * from veicle where id_courier = {data['id']} "
    cursor.execute(sql)
    rows = cursor.fetchall()
    db.commit()
    if len(rows) == 0:
        return 0

    return jsonify(rows)


@app.route('/addveicle', methods=['POST'])
def addveicle():
    data = request.get_json()
    sql = f"insert into veicle  values ('{data['plate']}','{data['fuel']}',{data['maxW']},{data['maxV']},'{data['brand']}',{data['id']}, 1);"
    print(sql)
    cursor.execute(sql)
    db.commit()
    return "Done"

@app.route('/addpkg', methods=['POST'])
def addpackage():
    data = request.get_json()
    sql = f"insert into package (code,destination,volume,weight) values ('{data['code']}','{data['dest']}',{data['vol']},{data['wei']});"

    cursor.execute(sql)
    db.commit()
    return "Done"


@app.route('/operatorHome', methods=['POST'])
def operatorhome():
    sql = "select * from package"
    cursor.execute(sql)
    rows = cursor.fetchall()
    db.commit()
    if len(rows) == 0:
        return 0

    return jsonify(rows)


@app.route('/login', methods=['POST'])
def loginendpoint():
    data = request.get_json()
    sql = f"select * from operator o where o.email = '{data['email']}' and o.pass = '{data['password']}'"
    cursor.execute(sql)
    rows = cursor.fetchall()
    db.commit()

    if len(rows) == 0:

        sql = f"select * from courier o where o.email = '{data['email']}' and o.pass = '{data['password']}'"
        cursor.execute(sql)
        rows = cursor.fetchall()
        db.commit()

        if len(rows) == 0:
            return "0"

        rows[0] = list(rows[0])
        rows[0].append("courier")
        sending = jsonify(rows[0])

        return sending

    else:
        rows[0] = list(rows[0])
        rows[0].append("operator")
        sending = jsonify(rows[0])
        return sending


@app.route('/test', methods=['GET'])
def test():
    return "Test"


if __name__ == "__main__":
    app.run(debug=True, host=api_host, port=api_port)
