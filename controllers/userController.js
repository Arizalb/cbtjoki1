const User = require("../models/userModel");

const UserController = {
  getUserProfile: (req, res) => {
    const userId = req.user.id; // Ambil ID pengguna dari token

    User.getById(userId, (err, user) => {
      if (err || !user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Kirimkan informasi profil pengguna
      res.json({
        username: user.username,
        role: user.role,
      });
    });
  },
};

module.exports = UserController;
