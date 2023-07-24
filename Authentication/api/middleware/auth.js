const { VerifySignature } = require("../../utils");

module.exports = async (req, res, next) => {
  const isAuthorized = await VerifySignature(req);
  if (isAuthorized) {
    return next();
  }
  return res.status(403).json({ message: "Not Authorized" });
};
