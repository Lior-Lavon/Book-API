const mongoose = require('mongoose');
const debug = require('debug')('mongo');

const mongoConnect = () => {
  const urlDB = 'mongodb://localhost/bookAPI';

  return new Promise((resolve, reject) => {
    mongoose.connect(urlDB, { useNewUrlParser: true });

    mongoose.connection.on('connected', () => {
      debug('Mongoose default connection is open to ', urlDB);
      resolve();
    });

    mongoose.connection.on('error', (err) => {
      debug(`Mongoose default connection has occured ${err} error`);
      reject();
    });

    mongoose.connection.on('disconnected', () => {
      debug('Mongoose default connection is disconnected');
    });

    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        debug('Mongoose default connection is disconnected due to application termination');
        process.exit(0);
      });
    });
  });
};

module.exports = mongoConnect;
