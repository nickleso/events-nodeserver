const successResult = (res, code, message, result) => {
  return res.json({
    message,
    code,
    data: result,
  });
};

const successAddData = (res, code, message, result) => {
  return res.json({
    message,
    code,
    data: result,
  });
};

module.exports = { successResult, successAddData };
