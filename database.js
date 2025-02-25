const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const readline = require('readline');

// Connect to SQLite database (or create it if it doesn't exist)
const db = new sqlite3.Database('database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('✅ Connected to the database.');
    }
});

// Read and execute the SQL file
fs.readFile('database.sql', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading SQL file:', err.message);
        return;
    }

    db.exec(data, (err) => {
        if (err) {
            console.error('Error executing SQL script:', err.message);
        } else {
            console.log('✅ SQL script executed successfully.');
            listTables();
        }
    });
});

// Function to list all tables in the database
function listTables() {
    db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
        if (err) {
            console.error('Error fetching tables:', err.message);
        } else {
            console.log('📌 Tables in the database:', tables.map(t => t.name).join(', '));
            askUserForTable();
        }
    });
}

// Function to ask user which table they want to view
function askUserForTable() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('🔍 Enter table name to view data (or type "exit" to quit): ', (tableName) => {
        if (tableName.toLowerCase() === 'exit') {
            closeDatabase();
            rl.close();
            return;
        }

        viewTableData(tableName);
        rl.close();
    });
}

// Function to display data from a specific table
function viewTableData(tableName) {
    db.all(`SELECT * FROM ${tableName}`, (err, rows) => {
        if (err) {
            console.error(`Error fetching data from ${tableName}:`, err.message);
        } else {
            console.log(`📄 Data from ${tableName}:`);
            console.table(rows);
        }
        askUserForTable();  // Ask again for another table or exit
    });
}

// Function to close the database connection
function closeDatabase() {
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        } else {
            console.log('✅ Database connection closed.');
        }
    });
}
