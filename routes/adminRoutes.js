const express = require("express");
const AdminController = require("../controllers/adminController");
const authenticateToken = require("../middleware/authMiddleware");
const QuestionController = require("../controllers/questionController");
const adminAccess = require("../middleware/adminAccess");

const router = express.Router();

// Rute untuk mengelola pengguna
router.post("/users", authenticateToken, adminAccess, AdminController.addUser); // Menambahkan pengguna baru
router.get(
  "/users",
  authenticateToken,
  adminAccess,
  AdminController.getAllUsers
); // Mengambil semua pengguna
router.put(
  "/users/:id",
  authenticateToken,
  adminAccess,
  AdminController.updateUser
); // Mengedit pengguna
router.delete(
  "/users/:id",
  authenticateToken,
  adminAccess,
  AdminController.deleteUser
); // Menghapus pengguna

// Rute untuk mengelola soal
router.get(
  "/questions",
  authenticateToken,
  adminAccess,
  AdminController.getAllQuestions
); // Mengambil semua soal
router.delete(
  "/questions/:id",
  authenticateToken,
  adminAccess,
  AdminController.deleteQuestion
); // Menghapus soal
router.post(
  "/questions",
  authenticateToken,
  adminAccess,
  QuestionController.addQuestion
); // Menambahkan soal
router.post(
  "/questions/bulk",
  authenticateToken,
  adminAccess,
  QuestionController.addMultipleQuestions
); // Menambahkan beberapa soal
router.put(
  "/questions/:id",
  authenticateToken,
  adminAccess,
  AdminController.updateQuestion
); // Mengedit soal

module.exports = router;
