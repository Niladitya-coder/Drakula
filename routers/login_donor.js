const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const router = express.Router();

// Connect to SQLite database
const db = new sqlite3.Database("./database.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) console.error("Database connection failed:", err);
});

// Render login page
router.get("/", (req, res) => {
    res.render("login_donor", { message: null });
});

// Handle login form submission
router.post("/", (req, res) => {
    const { contact } = req.body;

    // Check if donor exists
    const query = "SELECT donor_id, name FROM donors WHERE contact = ?";
    db.get(query, [contact], (err, donor) => {
        if (err) {
            console.error(err);
            return res.render("login_donor", { message: "Database error. Please try again." });
        }
        if (!donor) {
            return res.render("login_donor", { message: "Donor not found. Please check your contact number." });
        }

        // Successful login → Redirect to donor dashboard with donor_id
        res.redirect(`/dashboard/${donor.donor_id}`);
    });
});

module.exports = router;
