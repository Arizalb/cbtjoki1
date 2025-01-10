// routes/answerRoutes.js
const express = require("express");
const AnswerController = require("../controllers/answerController");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticateToken, AnswerController.submitAnswer); // Mengirim jawaban
router.get("/", authenticateToken, AnswerController.getUserAnswers); // Mengambil jawaban pengguna
router.post(
  "/submit-all",
  authenticateToken,
  AnswerController.submitAllAnswers
); // Mengirim semua jawaban
router.get("/score", authenticateToken, AnswerController.calculateScore); // Menghitung total skor

module.exports = router;
