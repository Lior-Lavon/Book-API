const express = require('express');
const bookCtrl = require('./controller');

const router = (Book) => {
  const bookController = bookCtrl(Book);

  const bookRouter = express.Router();
  bookRouter.route('/')
    .post(bookController.post)
    .get(bookController.get);

  bookRouter.use('/:bookId', bookController.params);
  bookRouter.route('/:bookId')
    .get(bookController.getById)
    .put(bookController.putById) // replace new book with existing
    .patch(bookController.patchById) // update attributes
    .delete(bookController.deleteById);

  return bookRouter;
};

module.exports = router;
