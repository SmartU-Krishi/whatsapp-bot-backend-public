const jwt = require("jsonwebtoken");
const config = require("../config");

const authenticateUser = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  // Remove 'Bearer ' prefix if present
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;

  jwt.verify(token, config.jwt.secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token expired or invalid" });
    }

    // Attach decoded token payload to req.user
    req.user = decoded;
    next();
  });
};

module.exports = { authenticateUser };
