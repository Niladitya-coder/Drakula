const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("login", {
        user: req.user || null
    });
});

module.exports = router;
