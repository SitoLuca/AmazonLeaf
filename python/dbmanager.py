import sqlite3
from flask import Flask, request, jsonify
from flask_cors import CORS

api_port = 10000 
# api_host = '80.211.148.196'
api_host = '127.0.0.1'
app = Flask(__name__)
CORS(app, resources={r'*': {'origins': '*'}})

db = sqlite3.connect('../DB/amazonleafdb.sqlite', check_same_thread=False)  # connect db
cursor = db.cursor()

@app.route('/manage_vehicles', methods=['POST'])
def manage_vehicles():

    data = request.get_json()

    sql = f"select plate from vehicle v where v.id_courier = {data['idc']} and available = false"
    res = cursor.execute(sql)

    traveling = res.fetchall()

    db.commit()

    return jsonify(traveling)

@app.route('/return_vehicle', methods=['POST'])
def return_vehicle():
    plate = (request.get_json())["plate"]
    sql = f"select * from package where id_v = '{plate}' and isDelivered = 0"
    cursor.execute(sql)
    p = cursor.fetchall()

    for package in p:
        sql = f"UPDATE package SET delivery_date = current_timestamp and isDelivered = true WHERE code = '{package[0]}'"
        cursor.execute(sql)
        db.commit()

    sql = f"UPDATE vehicle SET available = 1 WHERE plate = '{plate}'"
    cursor.execute(sql)
    db.commit()
    return "Done"


@app.route('/manage_deliveries', methods=['POST'])
def manage_deliveries():

    id = request.get_json()
    id = id["ID"]

    v = db.cursor()
    p = db.cursor()

    sql = f"select * from package where id_c = {id}"
    p.execute(sql)
    pack = p.fetchall()

    sql = f"select * from vehicle where id_courier = {id} and available = 1"

    v.execute(sql)
    vei = v.fetchall()

    db.commit()

    data = {"Vehicles": vei, "Packages": pack}

    return jsonify(data)

@app.route('/assign_C', methods=['POST'])
def assign_courriers():
    data = request.get_json()
    id = data.pop()
    data = data[0]

    for code in data:
        sql = f"update package set id_c = {id} where code = '{code}'"
        cursor.execute(sql)

    db.commit()

    return "Done"


@app.route('/manage_couriers', methods=['POST'])
def manage_courriers():
    c = db.cursor()
    p = db.cursor()

    sql = f"select * from package where id_c is null"
    p.execute(sql)
    pack = p.fetchall()

    sql = f"select c.*, sum(v.volumecap) as vol from courier c join vehicle v on  v.id_courier = c.id where v.available = 1 group by c.id order by c.KPI desc"

    p.execute(sql)
    cou = p.fetchall()

    db.commit()

    data = {"Couriers": cou, "Packages": pack}

    return jsonify(data)

@app.route('/updateKPI', methods=['POST'])
def updateKPI():
    data = request.get_json()
    kpi_sost = data["kpi_sost"]
    sql = f"UPDATE courier SET KPI = {kpi_sost} WHERE id = {data['id_azienda']}"
    print(sql)
    cursor.execute(sql)
    db.commit()
    return "Done"

@app.route('/courier_opHome', methods=['POST'])
def courier_ophome():
    data = request.get_json()

    sql = f"select v.* from vehicle v where id_courier = (select id_courier from courier_op co join courier c on co.id_courier = c.id where co.id = {data['id']})"
    cursor.execute(sql)
    rows = cursor.fetchall()
    db.commit()
    if len(rows) == 0:
        return 0

    return jsonify(rows)

@app.route('/setpackagevehicle', methods=['POST'])
def setpackagevehicle():
    data = request.get_json()
    for package in data["packages"]:
        sql = f"UPDATE package SET id_v = '{data['plate']}' WHERE code = '{package}'"
        print(sql)
        cursor.execute(sql)
        db.commit()
    sql = f"UPDATE vehicle SET available = 0 WHERE plate = '{data['plate']}'"
    print(sql)
    cursor.execute(sql)
    db.commit()
    return "Done"

@app.route('/addvehicle', methods=['POST'])
def addvehicle():
    data = request.get_json()

    sql = f"select id_courier from courier_op where id = {data['id']}"
    cursor.execute(sql)

    idComp = cursor.fetchall()

    db.commit()

    sql = f"insert into vehicle values ('{data['plate']}','{data['fuel']}',{data['maxW']},{data['maxV']},'{data['brand']}',{idComp[0][0]}, 1)"
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

        sql = f"select o.*, c.KPI from courier_op o join courier c on c.id = o.id_courier where o.email = '{data['email']}' and o.pass = '{data['password']}'"
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
