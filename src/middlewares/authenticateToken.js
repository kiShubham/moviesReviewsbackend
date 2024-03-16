const jwt = require("jsonwebtoken");
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  //"Bearer token.."

  if (!token) {
    return res.status(401).json({ message: "you are not authorized" });
  }

  jwt.verify(token, process.env.JWT_Secret, (err, user) => {
    if (err) return res.sendStatus(403); // forbidden ;
    req.user = user;

    next();
  });
};
module.exports = {
  authenticateToken,
};
