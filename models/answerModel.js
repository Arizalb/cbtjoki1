// models/answerModel.js
const db = require("../database/init");

const Answer = {
  create: (userId, questionId, answer, score, callback) => {
    // Memastikan callback adalah fungsi
    if (typeof callback !== "function") {
      throw new Error("Callback is not a function");
    }

    db.run(
      `INSERT INTO answers (userId, questionId, answer, score) VALUES (?, ?, ?, ?)`,
      [userId, questionId, answer, score],
      function (err) {
        // Memanggil callback dengan error dan lastID
        callback(err, this.lastID);
      }
    );
  },
  getUserAnswers: (userId, callback) => {
    db.all(`SELECT * FROM answers WHERE userId = ?`, [userId], callback);
  },
  calculateScore: (userId, callback) => {
    db.all(
      `SELECT SUM(score) as totalScore FROM answers WHERE userId = ?`,
      [userId],
      callback
    );
  },
};

module.exports = Answer;
