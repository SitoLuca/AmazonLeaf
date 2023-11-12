const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../DB/amazonleafdb.sqlite', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        return 0;
    }
    
});