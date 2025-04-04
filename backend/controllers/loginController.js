const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const dbFilePath = path.join(__dirname, "../db.json");
const SECRET_KEY = "your_secret_key"; 

const readDatabase = () => JSON.parse(fs.readFileSync(dbFilePath, "utf-8"));

exports.login = (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }
        if (!password) {
            return res.status(400).json({ error: "Password is required" });
        }

        let database = readDatabase();

        if (!database.customers || database.customers.length === 0) {
            return res.status(400).json({ error: "No users found in the system. Please sign up first." });
        }

        const user = database.customers.find((user) => user.email === email);

        if (!user) {
            return res.status(401).json({ error: "No user found with this email" });
        }
        
        if (password.trim() !== user.password.trim()) {
            return res.status(401).json({ error: "Incorrect password for this email" });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "7d" });

        res.cookie("token", token, { httpOnly: true, secure: false });

        res.status(200).json({ message: "Login successful", token, customer: user });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};
