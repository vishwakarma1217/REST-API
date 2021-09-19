const mongoose =  require('mongoose');
const config = require('config');
const logger = require('../logger');

function connect() {
    const dbUri = config.get("dbUri");;
  
    return mongoose
      .connect(dbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        logger.info("Database connected");
      })
      .catch((error) => {
        logger.error("db error", error);
        process.exit(1);
      });
  }
  
  module.exports = connect;