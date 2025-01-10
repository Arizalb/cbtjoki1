// models/questionModel.js
const db = require("../database/init");

const Question = {
  create: (questionData, callback) => {
    const { question, optionA, optionB, optionC, optionD, answer, score } =
      questionData;
    db.run(
      `INSERT INTO questions (question, optionA, optionB, optionC, optionD, answer, score) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [question, optionA, optionB, optionC, optionD, answer, score],
      function (err) {
        callback(err, this.lastID);
      }
    );
  },

  getAll: (callback) => {
    db.all(`SELECT * FROM questions`, [], callback);
  },

  getById: (id, callback) => {
    db.get(`SELECT * FROM questions WHERE id = ?`, [id], callback);
  },

  update: (id, updatedData, callback) => {
    const { question, optionA, optionB, optionC, optionD } = updatedData;

    db.run(
      `UPDATE questions SET question=?, optionA=?, optionB=?, optionC=?, optionD=? WHERE id=?`,
      [
        question || null,
        optionA || null,
        optionB || null,
        optionC || null,
        optionD || null,
        id,
      ],
      callback
    );
  },

  delete: (id, callback) => {
    db.run(`DELETE FROM questions WHERE id = ?`, [id], callback);
  },

  deleteAll: (callback) => {
    db.run(`DELETE FROM questions`, callback);
  },

  getRandomQuestions: (limit, callback) => {
    db.all(
      `SELECT * FROM questions ORDER BY RANDOM() LIMIT ?`,
      [limit],
      callback
    );
  },
};

module.exports = Question;
