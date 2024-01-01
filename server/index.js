require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("*", (req, res) => {
    res.status(404).send("Not Found");
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
