const { getErrorMessage } = require("./locales");

const handleError = (status, errorKey) => {
  const error = new Error(errorKey);
  error.statusCode = status;
  error.faMessage = getErrorMessage(errorKey).fa;
  error.enMessage = getErrorMessage(errorKey).en;
  return error;
};

const handleSuccess = (status, sucessKey, data) => {
  return { status, data, message: getErrorMessage(sucessKey) };
};

module.exports = { handleError, handleSuccess };
