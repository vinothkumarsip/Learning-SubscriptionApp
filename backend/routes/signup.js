const express = require("express");
const { signup } = require("../controllers/singupController"); 

const router = express.Router();

router.post("/", signup); 

module.exports = router;
