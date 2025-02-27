const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("dashboard", { 
        donor: req.user || { name: "Guest", donor_id: "N/A", blood_group: "N/A", age: "N/A", gender: "N/A", last_donation_date: "N/A" }
    });
});

module.exports = router;
