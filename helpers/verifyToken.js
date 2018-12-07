// FORMAT OF TOKEN
//  Authorization: <access_token>
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== "undefined") {
    req.token = bearerHeader;
    next();
  } else {
    res.sendStatus(403);
  }
};

module.exports = verifyToken;
