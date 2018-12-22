const express = require('express');
const debug = require('debug')('app');


const app = express();
require('./middlware/appMiddlware')(app);

const port = process.env.PORT || 3000;
const Book = require('./books/model');

// open the mongo connection
require('./mongo/mongo')()
  .then(() => {
    // run seed
  })
  .catch(() => {
    debug('Error mongo db');
  });

const bookRouter = require('./books/router')(Book);

app.use('/api/Books', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my API');
});

app.listen(port, () => {
  debug(`Server is listening on port ${port}`);
});
