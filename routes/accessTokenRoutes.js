const express = require("express");
const AccessTokenController = require("../controllers/accessTokenController");
const authenticateToken = require("../middleware/authMiddleware");
const adminAccess = require("../middleware/adminAccess");

const router = express.Router();

// Rute untuk membuat token akses
router.post(
  "/create",
  authenticateToken,
  adminAccess,
  AccessTokenController.createAccessToken
);

// Rute untuk memverifikasi token akses
router.get("/verify/:token", AccessTokenController.verifyAccessToken);

// Rute untuk membaca semua token akses
router.get(
  "/",
  authenticateToken,
  adminAccess,
  AccessTokenController.readAllAccessTokens
);

// Rute untuk memperbarui token akses
router.put(
  "/update/:id",
  authenticateToken,
  adminAccess,
  AccessTokenController.updateAccessToken
);

// Rute untuk menghapus token akses
router.delete(
  "/delete/:id",
  authenticateToken,
  adminAccess,
  AccessTokenController.deleteAccessToken
);

module.exports = router;
