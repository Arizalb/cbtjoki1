const User = require("../models/userModel"); // Pastikan Anda memiliki model untuk pengguna
const Question = require("../models/questionModel");
const bcrypt = require("bcryptjs");

const AdminController = {
  addUser: async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    User.create(username, hashedPassword, (err, userId) => {
      if (err) {
        return res.status(400).json({ message: "Username already exists" });
      }
      res.status(201).json({ id: userId, username });
    });
  },

  updateUser: (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    User.update(id, updatedData, (err) => {
      if (err) {
        return res.status(400).json({ message: "Error updating user" });
      }
      res.json({ message: "User updated successfully" });
    });
  },

  getAllUsers: (req, res) => {
    User.getAll((err, users) => {
      if (err) {
        return res.status(500).json({ message: "Error retrieving users" });
      }
      res.json(users);
    });
  },

  deleteUser: (req, res) => {
    const { id } = req.params;

    User.delete(id, (err) => {
      if (err) {
        return res.status(400).json({ message: "Error deleting user" });
      }
      res.json({ message: "User deleted successfully" });
    });
  },

  getAllQuestions: (req, res) => {
    Question.getAll((err, questions) => {
      if (err) {
        return res.status(500).json({ message: "Error retrieving questions" });
      }
      res.json(questions);
    });
  },

  deleteQuestion: (req, res) => {
    const { id } = req.params;

    Question.delete(id, (err) => {
      if (err) {
        return res.status(400).json({ message: "Error deleting question" });
      }
      res.json({ message: "Question deleted successfully" });
    });
  },

  updateQuestion: (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    Question.update(id, updatedData, (err) => {
      if (err) {
        return res.status(400).json({ message: "Error updating question" });
      }
      res.json({ message: "Question updated successfully" });
    });
  },
};

module.exports = AdminController;
