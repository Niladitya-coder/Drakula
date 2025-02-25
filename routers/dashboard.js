const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const router = express.Router();

// Connect to SQLite database
const db = new sqlite3.Database("./database.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) console.error("Database connection failed:", err);
});

// Render donor dashboard
router.get("/dashboard/:donor_id", (req, res) => {
    const donorId = req.params.donor_id;

    // Fetch donor details
    const query = "SELECT * FROM donors WHERE donor_id = ?";
    db.get(query, [donorId], (err, donor) => {
        if (err || !donor) {
            console.error(err);
            return res.status(404).send("Donor not found");
        }

        res.render("dashboard", { donor });
    });
});

module.exports = router;
