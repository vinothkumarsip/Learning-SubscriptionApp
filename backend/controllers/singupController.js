const fs = require("fs");
const path = require("path");

const dbFilePath = path.join(__dirname, "../db.json");

const readDatabase = () => JSON.parse(fs.readFileSync(dbFilePath, "utf-8"));
const writeDatabase = (data) => fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));

const signupUser = (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        if (!name || !email || !phone || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        let database = readDatabase();
        database.customers = database.customers || [];

        if (database.customers.find((user) => user.email === email)) {
            return res.status(400).json({ error: "Email already registered" });
        }

        if (database.customers.find((user) => user.phone === phone)) {
            return res.status(400).json({ error: "Phone number already registered" });
        }

        const newUser = { id: database.customers.length + 1, name, email, phone, password };
        database.customers.push(newUser);
        writeDatabase(database);

        res.status(201).json({ message: "Signup successful" });

    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { signupUser };
