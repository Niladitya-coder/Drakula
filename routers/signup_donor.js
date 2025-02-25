const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const router = express.Router();

// Connect to SQLite database
const db = new sqlite3.Database("./database.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) console.error(err.message);
    else console.log("Connected to SQLite database.");
});

// Render the sign-up page initially
router.get("/", (req, res) => {
    res.render("signup_donor", { message: null });
});

// Handle donor sign-up form submission
router.post("/", (req, res) => {
    const { username, password, name, contact, area, city, state, blood_type, last_donation_date, health_status } = req.body;

    const sql = `INSERT INTO BloodDonor (username, password, name, contact, area, city, state, blood_type, last_donation_date, health_status) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.run(sql, [username, password, name, contact, area, city, state, blood_type, last_donation_date, health_status], function (err) {
        if (err) {
            console.error(err.message);
            return res.render("signup_donor", { message: "Error: Username already exists or invalid data." });
        }
        res.render("signup_donor", { message: "Registration successful! You can now log in." });
    });
});

module.exports = router;
