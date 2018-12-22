const bookController = (Book) => {
  // middleware
  const params = (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        res.status(500).send(err);
      } else if (!book) {
        res.status(404).send('book not found');
      } else {
        req.book = book;
        next();
      }
    });
  };
  const post = (req, res) => {
    const book = new Book(req.body);
    book.save();
    res.status(201).send(book); // 201 = created
  };
  const get = (req, res) => {
    // filter 'ganre' data only
    // /api/Books?ganre=Science
    const query = {};
    if (req.query.ganre) {
      query.ganre = req.query.ganre;
    }
    Book.find(query, (err, books) => {
      if (err) {
        res.status(500).send(err); // error
      } else {
        // add hyperlink
        let returnBooks = [];
        books.forEach((element, index, array) => {
          const newBook = element.toJSON();
          newBook.links = {};
          newBook.links.self = `http://${req.headers.host}/api/books/${newBook._id}`;
          returnBooks.push(newBook);
        });

        res.status(200).json(returnBooks); // success
      }
    });
  };
  const getById = (req, res) => {
    if (req.book) {
      const newBook = req.book.toJSON();
      newBook.links = {};
      const link = `http://${req.headers.host}/api/books/?ganre=${newBook.ganre}`;
      newBook.links.FilterByGanre = link.replace(' ', '%20');
      res.status(200).json(newBook);
    }
  };
  const putById = (req, res) => {
    if (req.book) {
      req.book.title = req.body.title;
      req.book.author = req.body.author;
      req.book.ganre = req.body.ganre;
      req.book.read = req.body.read;
      req.book.save((err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(req.book);
        }
      });
    }
  };
  const patchById = (req, res) => {
    if (req.book) {
      /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
      if (req.body._id) {
        delete req.body._id;
      }
      req.book = Object.assign(req.book, req.body);
      req.book.save((err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(req.book);
        }
      });
    }
  };
  const deleteById = (req, res) => {
    if (req.book) {
      req.book.delete((err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(204).send('Removed');
        }
      });
    }
  };

  return {
    params,
    get,
    post,
    getById,
    putById, // replace full object
    patchById, // update only part of the object
    deleteById, // delete a book
  };
};

module.exports = bookController;
