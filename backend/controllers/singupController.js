const fs = require("fs");
const path = require("path");

const dbFilePath = path.join(__dirname, "../db.json");

const readDatabase = () => JSON.parse(fs.readFileSync(dbFilePath, "utf-8"));
const writeDatabase = (data) => fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));

exports.signup = (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ error: "All fields (name, email, phone, password) are required" });
    }

    // Check if email format is valid
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    let database = readDatabase();
    database.customers = database.customers || [];

    // Check if the email is already registered
    if (database.customers.find((user) => user.email === email)) {
      return res.status(400).json({ error: "Email is already registered. Please use a different email." });
    }

    // Create new user
    const newUser = { id: database.customers.length + 1, name, email, phone, password }; 
    database.customers.push(newUser);
    writeDatabase(database);

    res.status(201).json({ message: "Signup successful. You can now log in." });

  } catch (error) {
    console.error("Signup Error:", error);

    // Check for file read/write errors
    if (error.code === 'ENOENT') {
      return res.status(500).json({ error: "Database file not found. Please contact support." });
    }

    res.status(500).json({ error: "Internal server error. Please try again later." });
  }
};
