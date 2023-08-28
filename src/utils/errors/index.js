const logger = require("../logger");
const {
  NotFoundError,
  ValidationError,
  AuthorizeError,
} = require("./app-errors");

module.exports = (app) => {
  app.use((error, req, res, next) => {
    let reportError = true;

    // skip common / known errors
    [NotFoundError, ValidationError, AuthorizeError].forEach((typeOfError) => {
      if (error instanceof typeOfError) {
        reportError = false;
      }
    });

    logger.info(`${new Date()}-${JSON.stringify(error.message)}`);
    const statusCode = error.statusCode || 500;
    const data = error.data || error.message;
    return res.status(statusCode).json({ message: data });
  });
};
