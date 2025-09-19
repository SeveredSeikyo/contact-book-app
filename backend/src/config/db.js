const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database("./contacts.db");

const createContactsTableQuery = `
CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid VARCHAR(100) UNIQUE NOT NULL,
    name TEXT NOT NULL, 
    email TEXT NOT NULL, 
    phone TEXT UNIQUE NOT NULL
);`

db.run(createContactsTableQuery);

module.exports = db;