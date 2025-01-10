// routes/questionRoutes.js
const express = require("express");
const QuestionController = require("../controllers/questionController");
const authenticateToken = require("../middleware/authMiddleware");
const { verifyAccessToken } = require("../controllers/accessTokenController");

const router = express.Router();

router.post("/", authenticateToken, QuestionController.addQuestion); // Menambahkan soal
router.post(
  "/bulk",
  authenticateToken,
  QuestionController.addMultipleQuestions
); // Menambahkan beberapa soal
router.get("/exam", authenticateToken, QuestionController.getExamQuestions); // Mendapatkan soal ujian
router.get("/", authenticateToken, QuestionController.getQuestions); // Mengambil semua soal
router.get("/:id", authenticateToken, QuestionController.getQuestionById); // Mendapatkan soal berdasarkan ID
router.put("/:id", authenticateToken, QuestionController.updateQuestion);
router.delete("/:id", authenticateToken, QuestionController.deleteQuestion); // Menghapus satu soal
router.delete("/", authenticateToken, QuestionController.deleteAllQuestions); // Menghapus semua soal

module.exports = router;
