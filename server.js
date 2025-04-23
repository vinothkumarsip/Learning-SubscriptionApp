const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const authRoutes = require("./backend/routes/index"); 

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());

app.use(
  session({
    secret: "your-secret-key", 
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true }, 
  })
);

const checkAuth = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized access. Please log in." });
  }
};

app.use("/api", authRoutes);

app.get("/api/privatehomepage", checkAuth, (req, res) => {
  res.json({ message: "Welcome to your private homepage", user: req.session.user });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
