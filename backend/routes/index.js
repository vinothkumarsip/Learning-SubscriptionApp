const express = require("express");
const signupRoutes = require("./signup");
const loginRoutes = require("./login");

const router = express.Router();

router.use(signupRoutes);
router.use(loginRoutes);

module.exports = router;
