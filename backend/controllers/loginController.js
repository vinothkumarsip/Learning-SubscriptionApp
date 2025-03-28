const fs = require("fs");
const path = require("path");

const dbFilePath = path.join(__dirname, "../db.json");

const readDatabase = () => JSON.parse(fs.readFileSync(dbFilePath, "utf-8"));

const loginUser = (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        let database = readDatabase();

        if (!database.customers) {
            return res.status(400).json({ error: "No users found. Please sign up first." });
        }

        const user = database.customers.find((user) => user.email === email);
        if (!user || user.password !== password) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        res.status(200).json({ message: "Login successful", user });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { loginUser };
