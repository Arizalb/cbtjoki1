const db = require("../database/init"); // Sesuaikan dengan pengaturan database Anda

const verifyAccessToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Access token is required" });
  }

  db.get(`SELECT * FROM access_tokens WHERE token = ?`, [token], (err, row) => {
    if (err || !row) {
      return res.status(403).json({ message: "Invalid access token" });
    }
    next(); // Jika valid, lanjutkan ke rute berikutnya
  });
};

module.exports = verifyAccessToken;
