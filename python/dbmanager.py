# Import necessary modules
import sqlite3
from flask import Flask, request, jsonify
from flask_cors import CORS

# Set up API configurations
api_port = 10000
api_host = '127.0.0.1'  # localhost
app = Flask(__name__)
CORS(app, resources={r'*': {'origins': '*'}})

# Connect to the SQLite database
db = sqlite3.connect('../DB/amazonleafdb.sqlite', check_same_thread=False)  # connect db
cursor = db.cursor()

# Define a route for managing vehicles
@app.route('/manage_vehicles', methods=['POST'])
def manage_vehicles():
    data = request.get_json()  # Get JSON data from the request

    # SQL query to retrieve plates of non-available vehicles for a given courier
    sql = f"select plate from vehicle v where v.id_courier = {data['idc']} and available = false"
    res = cursor.execute(sql)  # Execute the SQL query
    traveling = res.fetchall()  # Fetch the results

    db.commit()  # Commit the transaction to the database

    return jsonify(traveling)  # Return the result as JSON

# Define a route for returning a vehicle
@app.route('/return_vehicle', methods=['POST'])
def return_vehicle():
    plate = (request.get_json())["plate"]  # Get the plate from the JSON data
    # SQL query to update package delivery status and vehicle availability
    sql = f"select * from package where id_v = '{plate}' and isDelivered = 0"
    cursor.execute(sql)
    p = cursor.fetchall()

    # Update package delivery status and commit changes
    for package in p:
        sql = f"UPDATE package SET delivery_date = current_timestamp and isDelivered = true WHERE code = '{package[0]}'"
        cursor.execute(sql)
        db.commit()

    # Update vehicle availability and commit changes
    sql = f"UPDATE vehicle SET available = 1 WHERE plate = '{plate}'"
    cursor.execute(sql)
    db.commit()
    return "Done"  # Return a success message

# Define a route for managing deliveries
@app.route('/manage_deliveries', methods=['POST'])
def manage_deliveries():
    id = request.get_json()  # Get the courier ID from the JSON data
    id = id["ID"]

    v = db.cursor()
    p = db.cursor()

    # SQL query to retrieve packages and available vehicles for a given courier
    sql = f"select * from package where id_c = {id}"
    p.execute(sql)
    pack = p.fetchall()

    sql = f"select * from vehicle where id_courier = {id} and available = 1"
    v.execute(sql)
    vei = v.fetchall()

    db.commit()

    data = {"Vehicles": vei, "Packages": pack}  # Combine results into a dictionary

    return jsonify(data)  # Return the result as JSON

# Define a route for assigning couriers to packages
@app.route('/assign_C', methods=['POST'])
def assign_couriers():
    data = request.get_json()  # Get JSON data from the request
    id = data.pop()  # Extract courier ID from the data
    data = data[0]  # Extract package codes from the data

    # Update package records with the assigned courier ID
    for code in data:
        sql = f"update package set id_c = {id} where code = '{code}'"
        cursor.execute(sql)

    db.commit()  # Commit changes to the database

    return "Done"  # Return a success message

# Define a route for managing couriers
@app.route('/manage_couriers', methods=['POST'])
def manage_couriers():
    c = db.cursor()
    p = db.cursor()

    # SQL queries to retrieve packages with no assigned courier and available couriers with their total volume capacity
    sql = f"select * from package where id_c is null"
    p.execute(sql)
    pack = p.fetchall()

    sql = f"select c.*, sum(v.volumecap) as vol from courier c join vehicle v on  v.id_courier = c.id where v.available = 1 and c.KPI is not null group by c.id order by c.KPI "
    p.execute(sql)
    cou = p.fetchall()

    db.commit()

    data = {"Couriers": cou, "Packages": pack}  # Combine results into a dictionary

    return jsonify(data)  # Return the result as JSON

# Define a route for updating courier KPI
@app.route('/updateKPI', methods=['POST'])
def updateKPI():
    data = request.get_json()  # Get JSON data from the request
    kpi_sost = data["kpi_sost"]

    # SQL query to update courier KPI
    sql = f"UPDATE courier SET KPI = {kpi_sost} WHERE id = {data['id_azienda']}"
    print(sql)
    cursor.execute(sql)
    db.commit()

    return "Done"  # Return a success message

# Define a route for courier operator's home
@app.route('/courier_opHome', methods=['POST'])
def courier_ophome():
    data = request.get_json()  # Get JSON data from the request

    # SQL query to retrieve vehicles assigned to a courier operator
    sql = f"select v.* from vehicle v where id_courier = (select id_courier from courier_op co join courier c on co.id_courier = c.id where co.id = {data['id']})"
    cursor.execute(sql)
    rows = cursor.fetchall()
    db.commit()

    if len(rows) == 0:
        return 0

    return jsonify(rows)  # Return the result as JSON

# Define a route for setting package to vehicle
@app.route('/setpackagevehicle', methods=['POST'])
def setpackagevehicle():
    data = request.get_json()  # Get JSON data from the request

    # Update package records with the assigned vehicle ID
    for package in data["packages"]:
        sql = f"UPDATE package SET id_v = '{data['plate']}' WHERE code = '{package}'"
        print(sql)
        cursor.execute(sql)
        db.commit()

    # Update vehicle availability
    sql = f"UPDATE vehicle SET available = 0 WHERE plate = '{data['plate']}'"
    print(sql)
    cursor.execute(sql)
    db.commit()

    return "Done"  # Return a success message

# Define a route for adding a new vehicle
@app.route('/addvehicle', methods=['POST'])
def addvehicle():
    data = request.get_json()  # Get JSON data from the request

    # Retrieve courier ID for the courier operator
    sql = f"select id_courier from courier_op where id = {data['id']}"
    cursor.execute(sql)
    idComp = cursor.fetchall()

    db.commit()

    # Insert a new vehicle record into the database
    sql = f"insert into vehicle values ('{data['plate']}','{data['fuel']}',{data['maxW']},{data['maxV']},'{data['brand']}',{idComp[0][0]}, 1)"
    print(sql)
    cursor.execute(sql)
    db.commit()

    return "Done"  # Return a success message

# Define a route for adding a new package
@app.route('/addpkg', methods=['POST'])
def addpackage():
    data = request.get_json()  # Get JSON data from the request

    # Insert a new package record into the database
    sql = f"insert into package (code,destination,volume,weight) values ('{data['code']}','{data['dest']}',{data['vol']},{data['wei']});"
    cursor.execute(sql)
    db.commit()

    return "Done"  # Return a success message

# Define a route for operator's home
@app.route('/operatorHome', methods=['POST'])
def operatorhome():
    sql = "select * from package"
    cursor.execute(sql)
    rows = cursor.fetchall()
    db.commit()

    if len(rows) == 0:
        return 0

    return jsonify(rows)  # Return the result as JSON

# Define a route for user login
@app.route('/login', methods=['POST'])
def loginendpoint():
    data = request.get_json()  # Get JSON data from the request

    # Check if the user is an operator
    sql = f"select * from operator o where o.email = '{data['email']}' and o.pass = '{data['password']}'"
    cursor.execute(sql)
    rows = cursor.fetchall()
    db.commit()

    # If not an operator, check if the user is a courier operator
    if len(rows) == 0:
        sql = f"select o.*, c.KPI from courier_op o join courier c on c.id = o.id_courier where o.email = '{data['email']}' and o.pass = '{data['password']}'"
        cursor.execute(sql)
        rows = cursor.fetchall()
        db.commit()

        # If no records found, return "0"
        if len(rows) == 0:
            return "0"

        rows[0] = list(rows[0])
        rows[0].append("courier_op")
        sending = jsonify(rows[0])

        return sending  # Return the result as JSON

    else:
        rows[0] = list(rows[0])
        rows[0].append("operator")
        sending = jsonify(rows[0])

        return sending  # Return the result as JSON

# Define a test route
@app.route('/test', methods=['GET'])
def test():
    return "Test"

# Run the API server
def api_server(debug, host, port):
    app.run(debug=debug, host=host, port=port)

# Run the API server if the script is executed
if __name__ == "__main__":
    api_server(True, api_host, api_port)
