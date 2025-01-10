// controllers/answerController.js
const Answer = require("../models/answerModel");
const Question = require("../models/questionModel"); // Import model soal

const AnswerController = {
  submitAnswer: (req, res) => {
    const { questionId, answer } = req.body;
    const userId = req.user.id; // Ambil ID pengguna dari token

    // Ambil soal untuk mendapatkan skor
    Question.getById(questionId, (err, question) => {
      if (err || !question) {
        return res.status(404).json({ message: "Question not found" });
      }

      const score = answer === question.answer ? question.score : 0; // Hitung skor

      Answer.create(userId, questionId, answer, score, (err, answerId) => {
        if (err) {
          console.error("Error submitting answer:", err); // Tambahkan log kesalahan
          return res.status(400).json({ message: "Error submitting answer" });
        }
        res.status(201).json({ id: answerId });
      });
    });
  },

  getUserAnswers: (req, res) => {
    const userId = req.user.id; // Ambil ID pengguna dari token

    Answer.getUserAnswers(userId, (err, answers) => {
      if (err) {
        return res.status(500).json({ message: "Error retrieving answers" });
      }
      res.json(answers);
    });
  },

  calculateScore: (req, res) => {
    const userId = req.user.id; // Ambil ID pengguna dari token

    Answer.calculateScore(userId, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error calculating score" });
      }
      res.json({ totalScore: result[0].totalScore || 0 }); // Mengembalikan total skor
    });
  },

  submitAllAnswers: (req, res) => {
    const userId = req.user.id; // Ambil ID pengguna dari token
    const answers = req.body.answers; // Misalnya, [{ questionId: 1, answer: 'C' }, ...]

    if (!Array.isArray(answers) || answers.length === 0) {
      return res
        .status(400)
        .json({ message: "Answers must be an array and cannot be empty." });
    }

    let totalScore = 0; // Untuk menghitung total skor
    let completed = 0; // Untuk menghitung jumlah jawaban yang telah diproses

    answers.forEach(({ questionId, answer }) => {
      Question.getById(questionId, (err, question) => {
        if (err || !question) {
          return res.status(404).json({ message: "Question not found" });
        }

        const score = answer === question.answer ? question.score : 0; // Hitung skor berdasarkan jawaban
        Answer.create(userId, questionId, answer, score, (err) => {
          if (err) {
            return res.status(400).json({ message: "Error submitting answer" });
          }

          totalScore += score; // Tambahkan skor ke total
          completed++;

          // Jika semua jawaban telah diproses, kirim total skor
          if (completed === answers.length) {
            res.json({ totalScore }); // Kirim total skor sebagai respons
          }
        });
      });
    });
  },
};

module.exports = AnswerController;
