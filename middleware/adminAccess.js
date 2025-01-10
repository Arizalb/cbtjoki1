const authenticateToken = require("./authMiddleware");

const adminAccess = (req, res, next) => {
  // Gunakan middleware authenticateToken untuk memverifikasi token
  authenticateToken(req, res, () => {
    // Periksa apakah role user adalah admin
    if (req.user && req.user.role === "admin") {
      return next(); // Lanjutkan ke endpoint berikutnya
    } else {
      return res
        .status(403)
        .json({ message: "Access restricted to admins only" });
    }
  });
};

module.exports = adminAccess;
