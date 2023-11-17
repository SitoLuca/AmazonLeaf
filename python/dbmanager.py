import sqlite3
from flask import Flask, request, jsonify
from flask_cors import CORS

api_port = 10000  # sul Crispy McBacon la porta 5000 e 7000 sono esclusive :-(
# api_host = '80.211.148.196'
api_host = '127.0.0.1'
app = Flask(__name__)
CORS(app, resources={r'*': {'origins': '*'}})

db = sqlite3.connect('../DB/amazonleafdb.sqlite', check_same_thread=False)  # connect db
cursor = db.cursor()


@app.route('/manage_couriers', methods=['POST'])
def manage_courriers():
    c = db.cursor()
    p = db.cursor()

    sql = f"select * from package where id_c is null"
    p.execute(sql)
    pack = p.fetchall()

    sql = f"select c.*, sum(v.volumecap) as vol from courier c join vehicle v on  v.id_courier = c.id where v.available = 1 group by c.id order by KPI"

    p.execute(sql)
    cou = p.fetchall()

    db.commit()

    data = {"Couriers": cou, "Packages": pack}

    return jsonify(data)


@app.route('/courier_opHome', methods=['POST'])
def courier_ophome():
    data = request.get_json()
    sql = f"select * from vehicle where id_courier = {data['id']}"
    cursor.execute(sql)
    rows = cursor.fetchall()
    db.commit()
    if len(rows) == 0:
        return 0

    return jsonify(rows)


@app.route('/addvehicle', methods=['POST'])
def addvehicle():
    data = request.get_json()
    sql = f"insert into vehicle  values ('{data['plate']}','{data['fuel']}',{data['maxW']},{data['maxV']},'{data['brand']}',{data['id']}, 1);"
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

        sql = f"select * from courier_op o where o.email = '{data['email']}' and o.pass = '{data['password']}'"
        cursor.execute(sql)
        rows = cursor.fetchall()
        db.commit()

        if len(rows) == 0:
            return "0"

        rows[0] = list(rows[0])
        rows[0].append("courier_op")
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
