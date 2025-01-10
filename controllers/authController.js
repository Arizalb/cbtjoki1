// controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const JWT_SECRET = "your_jwt_secret"; // Ganti dengan secret yang lebih aman

const AuthController = {
  register: async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    User.create(username, hashedPassword, (err, userId) => {
      if (err) {
        return res.status(400).json({ message: "Username already exists" });
      }
      res.status(201).json({ id: userId, username });
    });
  },

  login: (req, res) => {
    const { username, password } = req.body;

    User.findByUsername(username, (err, user) => {
      if (err || !user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET || "your_jwt_secret",
        { expiresIn: "1h" }
      );

      const role = user.role;
      const name = user.username;

      res.json({ token, role, name });
    });
  },
};

module.exports = AuthController;
