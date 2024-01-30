const logger = require("./logger")

module.exports = async function logError(message, stack, controller, method) {
    var err = message + stack;
    //console.log(err);
    logger.error(controller + " " + method + " :"  + err);
    return err;
  }