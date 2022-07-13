const httpStatusCode = {
  BadRequest: 400,
  InternalServer: 500,
};

const erroHandler = (err, _req, res, _next) => {
  const { code } = err;
  if (!code) return res.status(httpStatusCode.InternalServer).json({ message: err.message });
  res.status(httpStatusCode[code]).json({ message: err.message });
};

module.exports = erroHandler;