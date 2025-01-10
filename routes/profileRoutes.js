const express = require("express");
const UserController = require("../controllers/userController");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Rute untuk mendapatkan profil pengguna
router.get("/profile", authenticateToken, UserController.getUserProfile);

module.exports = router;
