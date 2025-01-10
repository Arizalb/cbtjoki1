// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET; // Ganti dengan secret yang lebih aman

const authenticateToken = (req, res, next) => {
  // Ambil token dari header Authorization
  const token = req.headers["authorization"]?.split(" ")[1];

  // Jika tidak ada token, kirim status 401 (Unauthorized)
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error("JWT verification error:", err);
      return res.status(403).send("Forbidden");
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
