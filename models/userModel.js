// models/userModel.js
const db = require("../database/init");

const User = {
  create: (username, password, callback) => {
    let role = "user";
    db.run(
      `INSERT INTO users (username, password, role) VALUES (?, ?, ?)`,
      [username, password, role],
      function (err) {
        callback(err, this.lastID);
      }
    );
  },
  findByUsername: (username, callback) => {
    db.get(`SELECT * FROM users WHERE username = ?`, [username], callback);
  },
  getAll: (callback) => {
    db.all(`SELECT id, username FROM users`, [], callback);
  },

  update: (id, updatedData, callback) => {
    const { username } = updatedData;

    db.run(
      `UPDATE users SET username=? WHERE id=?`,
      [username || null, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.run(`DELETE FROM users WHERE id=?`, [id], callback);
  },
  getById: (id, callback) => {
    db.get(`SELECT * FROM users WHERE id = ?`, [id], callback);
  },

  getByUsername: (username, callback) => {
    db.get(`SELECT * FROM users WHERE username = ?`, [username], callback);
  },
};

module.exports = User;
