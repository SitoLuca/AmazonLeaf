# AmazonLeaf <img src="https://raw.githubusercontent.com/SitoLuca/AmazonLeaf/master/Pages/IMG/AmazonLeaflogo-transformed-min.webp?token=GHSAT0AAAAAACJHRM6YOIXII3467BGSIRS6ZMEJUVA" alt="drawing" width="5%"/>

Project for the TechWeb exam 2023/2024 - Prof. R. Montella  

## Participants
<a href="https://www.linkedin.com/in/luca-sito-94a2b2229/" target="_blank">Luca Sito</a> 0124/2612

<a href="https://www.linkedin.com/in/vittorio-picone-916319168/" target="_blank">Vittorio Picone</a> 0124/2584
## Description
The purpose of this project is to help the multinational company Amazon to augment its environmental sustainability by reducing the CO2 emissions

The system will be structured to make choices automatically to improve sustainability during the selection phase of the courier responsible for delivering parcels without giving up the functionality of a normal application for managing sorting centers. 

The main effort will be that of selecting the courier, this will be characterized by a sustainability index (KPI).
At the time of shipment, the system will provide a list of available couriers sorted by KPI which will be calculated based on data entered by the company itself.

## Coding
### Languages used
- **Python**: 
    used for the backend API and for the webserver
- **JavaScript**:
    used for the frontend and for managing the communication between frontend and backend 
- **SQL**:
    for database interrogation
- **Markup and stylesheet languages**:
    HTML and CSS for the frontend structures and aesthetics
### Libraries and Tools
#### Libraries
- **Python 3.11**:
    - stdlibs (standard Out-Of-The-Box Python libraries)
      -  multiprocessing
      - http.server
      - socketserver
      - os
      - sqlite3
      - argparse
    - FLASK
    - FLASK-CORS

- **JavaScript**:
  - Bootstrap (JS)
  - JQuery
  - QRCode.min.js
  - extra.js (custom library)

- **Markup and stylesheet languages**:
    - Bootstrap

#### Tools
- **Webstorm**:
  for frontend development
- **Pycharm**:
  for the python backend development
- **Datagrip**:
  for managing the SQLite database
- **GitHub**:
  for the version control system
- **SQLite 3**:
  as the DBMS since is lightweight and file-based

### How to install and run locally the project
1. Download **<a href="https://www.python.org/downloads/release/python-3110" target="_blank">Python 3.11</a>** from the official website
2. Run the following command in the terminal
    ```bash
   git clone https://github.com/SitoLuca/AmazonLeaf.git
   cd AmazonLeaf
   cd python
    ```
3. Run the pip install command to install the required external libraries 
    ```bash
    pip install -r requirements.txt
    ```
4. Run the python main.py script, making sure that the 10000 port is free (it is needed for the API to run)
    ```bash
    python main.py
    ```
   In case an error occurs on the webserver module, try to run the script with sudo (error frequent on macOS)
   ```bash
    sudo python main.py
   ```
   If no arguments are passed, the default address is:
    - <a href="http://localhost:80" target="_blank">http://localhost:80</a> for the webserver
   
   The arguments are:
   - **--host_web**: defines the Webserver host address (string)
   - **--port_web**: defines the Webserver port number (int)

   You can specify as many arguments as you want, for example:
    ```bash
    python main.py --port_web 11000
    ```
    Now the webserver will be run on the 11000 port
6. For testing the website you can access by using one of the following accounts:

   | Courier Operators             | Hub Operartors                |
   |-------------------------------|-------------------------------|
   | Patrick.Greene@amazonleaf.com | Gabriel.Kim@amazonleaf.com    |
   | Isaac.Peterson@amazonleaf.com | Adrian.Young@amazonleaf.com   |
   | Leah.Bailey@amazonleaf.com    | Isabella.Baker@amazonleaf.com |

    The password is by default **amazonleaf**

