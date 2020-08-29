const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.render('girls')
})

module.exports = router;