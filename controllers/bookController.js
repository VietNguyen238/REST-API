const { Book, Author } = require('../models/model')

const bookController = {
    // add a book
    addBook: async (req, res, next) => {
        try {
            const newBook = new Book(req.body);
            const savedBook = await newBook.save();
            if (req.body.author) {
                const author = Author.findById(req.body.author);
                await author.updateOne({ $push: { books: savedBook._id } }) // push: đưa id vào 
            }
            res.status(200).json(savedBook);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // get all books
    getAllBooks: async (req, res, next) => {
        try {
            const allBooks = await Book.find();
            res.status(200).json(allBooks);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    // get a book
    getABook: async (req, res, next) => {
        try {
            const book = await Book.findById(req.params.id).populate("author");
            res.status(200).json(book);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    // Update a book
    updateBook: async (req, res, next) => {
        try {
            const book = await Book.findById(req.params.id);
            await book.updateOne({ $set: req.body })
            res.status(200).json("Updated successfully!");
        } catch (err) {
            res.status(500).json(err)
        }
    },

    // Delete a book
    deleteBook: async (req, res, next) => {
        try {
            await Author.updateMany(
                { books: req.params.id },
                { $pull: { books: req.params.id } } // pull: lấy id ra
            )
            await Book.findByIdAndDelete(req.params.id)
            res.status(200).json("Deleted successfully!");
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = bookController;