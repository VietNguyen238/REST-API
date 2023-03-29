const bookController = require('../controllers/bookController');

const router = require('express').Router();

// add a book
router.post("/", bookController.addBook);

// get all books
router.get("/", bookController.getAllBooks);

// get a book
router.get("/:id", bookController.getABook);

// Update a book
router.put("/:id", bookController.updateBook)

// Detele a book
router.delete("/:id", bookController.deleteBook);

module.exports = router;