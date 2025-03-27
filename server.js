const express = require("express");
const cors = require("cors");
const routes = require("./backend/routes");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.use("/", routes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
