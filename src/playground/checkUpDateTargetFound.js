const checkIsNullResponse = require("./checkIsNullResponse");
const UpdateTargetNotFoundError = require("./updateTargetNotFoundError");

// if target empty, reject with the errorMsg recieve
module.exports = function checkUpDateTargetFound (err, query, reject, errorMsg) {
  if (!query) {
    reject(errorMsg) ;
  }

  //could also handle a regular query error
};
