const mongoose = require("mongoose");
const Book = require("../models/Book");
const BookPartSchema = require("../models/BookPart");

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

exports.getOneBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.json(book);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

exports.createBook = async (req, res) => {
    try {
        const title = req.body.title;
        const description = req.body.description;
        const thumbnail = req.body.thumbnail;
        const allText = req.body.text.split(" ");

        const bookParts = [];
        var dividedText = [];
        const BookPart = mongoose.model("BookPart", BookPartSchema);
        var index = 0;
        for(let i = 0; i < allText.length; i){
            for(let j = 0; j < 5; j++){
                if(allText[i] == undefined || allText[i] == null)
                    break;
                dividedText.push(allText[i]);
                i++;
            }
            bookParts.push(new BookPart({
                partNumber: index++, 
                content: dividedText,
            }));
            dividedText = [];
        }

        const book = await Book.create({
            title,
            description,
            thumbnail,
            parts: bookParts,
        });
        res.json(book);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

exports.updateBook = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid ObjectId" });
        }

        const title = req.body.title;
        const description = req.body.description;
        const thumbnail = req.body.thumbnail;
        const allText = req.body.text.split(" ");

        const bookParts = [];
        var dividedText = [];
        const BookPart = mongoose.model("BookPart", BookPartSchema);
        var index = 0;

        for(let i = 0; i < allText.length; i){
            for(let j = 0; j < 5; j++){
                if(allText[i] == undefined || allText[i] == null)
                    break;
                dividedText.push(allText[i]);
                i++;
            }
            bookParts.push(new BookPart({
                partNumber: index++, 
                content: dividedText,
            }));
            dividedText = [];
        }

        const updatedBook = await Book.findByIdAndUpdate({
            _id: req.params.id,
        },{
            title,
            description,
            thumbnail,
            parts: bookParts,
        }, {
            new: true,
        });
        
        if (!updatedBook) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.json(updatedBook);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid ObjectId" });
        }
        const deletedBook = await Book.findByIdAndDelete(req.params.id);

        if (!deletedBook) {
            return res.status(404).json({ error: "Book not found" });
        }

        res.json(deletedBook);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};
