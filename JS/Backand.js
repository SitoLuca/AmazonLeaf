const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../DB/amazonleafdb.sqlite', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        return 0;
    }
});

const http = require('http');
const url = require('url');  // Aggiunto il modulo 'url'

http.createServer(function (req, res) {

    let parsedUrl = url.parse(req.url, true);

    if (req.pathname === "/login") {

        console.log(req.data());
        res.end(JSON.stringify("ricevuto"));

    }

}).listen(8080);

