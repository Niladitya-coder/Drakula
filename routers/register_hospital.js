const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("register_hospital", {
        user: req.user || null
    });
});

module.exports = router;