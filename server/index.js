require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const bookController = require("./controllers/bookController");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/books", bookController.getAllBooks);
app.get("/books/:id", bookController.getOneBook);
app.post("/books", bookController.createBook);
app.put("/books/:id", bookController.updateBook);
app.delete("/books/:id", bookController.deleteBook);

app.get("*", (req, res) => {
    res.statusCode(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
