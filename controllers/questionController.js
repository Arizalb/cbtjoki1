// controllers/questionController.js
const Question = require("../models/questionModel");

const QuestionController = {
  addQuestion: (req, res) => {
    const questionData = req.body; // Ambil data dari request body

    // Validasi data sebelum menyimpannya
    if (
      !questionData.question ||
      !questionData.optionA ||
      !questionData.optionB ||
      !questionData.optionC ||
      !questionData.optionD ||
      !questionData.answer ||
      questionData.score === undefined
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    Question.create(questionData, (err, questionId) => {
      if (err) {
        return res.status(400).json({ message: "Error adding question" });
      }
      res.status(201).json({ id: questionId });
    });
  },

  addMultipleQuestions: (req, res) => {
    const questionsData = req.body; // Ambil data dari request body

    // Validasi bahwa data yang diterima adalah array
    if (!Array.isArray(questionsData) || questionsData.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid input: expected an array of questions." });
    }

    const insertPromises = questionsData.map((questionData) => {
      // Validasi setiap data soal sebelum menyimpannya
      if (
        !questionData.question ||
        !questionData.optionA ||
        !questionData.optionB ||
        !questionData.optionC ||
        !questionData.optionD ||
        !questionData.answer ||
        questionData.score === undefined
      ) {
        return Promise.reject(
          new Error("All fields are required for each question")
        );
      }

      return new Promise((resolve, reject) => {
        Question.create(questionData, (err, questionId) => {
          if (err) {
            reject(err);
          } else {
            resolve({ id: questionId });
          }
        });
      });
    });

    Promise.all(insertPromises)
      .then((results) => {
        res.status(201).json(results); // Kirim semua ID soal yang ditambahkan
      })
      .catch((err) => {
        res
          .status(400)
          .json({ message: err.message || "Error adding questions" });
      });
  },

  getQuestions: (req, res) => {
    Question.getAll((err, questions) => {
      if (err) {
        return res.status(500).json({ message: "Error retrieving questions" });
      }
      res.json(questions);
    });
  },
  getQuestionById: (req, res) => {
    const { id } = req.params; // Ambil ID dari parameter URL
    Question.getById(id, (err, question) => {
      if (err) {
        return res.status(500).json({ message: "Error retrieving question" });
      }
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }
      res.json(question); // Kirim soal yang ditemukan sebagai respons
    });
  },

  updateQuestion: (req, res) => {
    const { id } = req.params; // Ambil ID dari parameter URL
    const updatedData = req.body; // Ambil data yang diperbarui dari request body

    // Validasi data yang diterima
    if (
      !updatedData.question ||
      !updatedData.optionA ||
      !updatedData.optionB ||
      !updatedData.optionC ||
      !updatedData.optionD ||
      !updatedData.answer ||
      updatedData.score === undefined
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    Question.update(id, updatedData, (err) => {
      if (err) {
        return res.status(400).json({ message: "Error updating question" });
      }
      res.json({ message: "Question updated successfully" });
    });
  },

  deleteQuestion: (req, res) => {
    const { id } = req.params; // Ambil ID dari parameter URL

    Question.delete(id, (err) => {
      if (err) {
        return res.status(400).json({ message: "Error deleting question" });
      }
      res.json({ message: "Question deleted successfully" });
    });
  },

  // Metode untuk menghapus semua soal
  deleteAllQuestions: (req, res) => {
    Question.deleteAll((err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Error deleting all questions" });
      }
      res.json({ message: "All questions deleted successfully" });
    });
  },

  getExamQuestions: (req, res) => {
    // Ambil soal secara acak, misalnya 10 soal
    const limit = 20;
    Question.getRandomQuestions(limit, (err, questions) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error retrieving exam questions" });
      }
      res.json(questions);
    });
  },
};

module.exports = QuestionController;
