const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../DB/amazonleafdb.sqlite', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        return 0;
    }


});


const q = "select * from package";

db.all(q, [], (err, rows) => {
    if (err) {
        throw err;
    }
    rows.forEach((row) => {
        console.log(row.code);
    });
});
