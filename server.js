const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(express.json()); 
app.use(cors()); 

const dbFilePath = path.join(__dirname, "backend/db.json");

const readDatabase = () => {
    const data = fs.readFileSync(dbFilePath, "utf-8");
    return JSON.parse(data);
};

const writeDatabase = (data) => {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
};

app.post("/signup", (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        if (!name || !email || !phone || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        let database = readDatabase();
        
        if (!database.customers) {
            database.customers = [];
        }

        const existingUser = database.customers.find((user) => user.email === email);
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }

        const newUser = { id: database.customers.length + 1, name, email, phone, password };
        database.customers.push(newUser);
        writeDatabase(database);

        res.status(201).json({ message: "Signup successful" });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/login", (req, res) => {
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
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
