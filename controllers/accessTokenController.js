const db = require("../database/init"); // Sesuaikan dengan pengaturan database Anda

const AccessTokenController = {
  createAccessToken: (req, res) => {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    db.run(
      `INSERT INTO access_tokens (token) VALUES (?)`,
      [token],
      function (err) {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error creating access token" });
        }
        res.status(201).json({ id: this.lastID, token });
      }
    );
  },

  verifyAccessToken: (req, res) => {
    const { token } = req.params;

    db.get(
      `SELECT * FROM access_tokens WHERE token = ?`,
      [token],
      (err, row) => {
        if (err || !row) {
          return res.status(403).json({ message: "Invalid access token" });
        }
        res.json({ message: "Access token is valid" });
        console.log("Access token is valid");
      }
    );
  },

  readAllAccessTokens: (req, res) => {
    db.all(`SELECT * FROM access_tokens`, [], (err, rows) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error retrieving access tokens" });
      }
      res.json(rows);
    });
  },

  updateAccessToken: (req, res) => {
    const { id } = req.params;
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    db.run(
      `UPDATE access_tokens SET token = ? WHERE id = ?`,
      [token, id],
      function (err) {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error updating access token" });
        }
        if (this.changes === 0) {
          return res.status(404).json({ message: "Access token not found" });
        }
        res.json({ message: "Access token updated successfully" });
      }
    );
  },

  deleteAccessToken: (req, res) => {
    const { id } = req.params;

    db.run(`DELETE FROM access_tokens WHERE id = ?`, [id], function (err) {
      if (err) {
        return res.status(500).json({ message: "Error deleting access token" });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: "Access token not found" });
      }
      res.json({ message: "Access token deleted successfully" });
    });
  },
};

module.exports = AccessTokenController;
