const express = require("express");
const loginRoutes = require("./login");
const signupRoutes = require("./signup");
const { checkAuth, logout } = require("../controllers/authMiddleware");

const router = express.Router();

router.use("/login", loginRoutes);
router.use("/signup", signupRoutes);

router.get("/auth-status", checkAuth);
router.post("/logout", logout);

module.exports = router;
