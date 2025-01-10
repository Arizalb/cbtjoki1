// database.js
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database/cbt.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the SQLite database.");
});

// Buat tabel jika belum ada
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT UNIQUE, password TEXT, role TEXT)"
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS questions (id INTEGER PRIMARY KEY, question TEXT, optionA TEXT, optionB TEXT, optionC TEXT, optionD TEXT, answer TEXT, score INTEGER)"
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS answers (id INTEGER PRIMARY KEY, userId INTEGER, questionId INTEGER, answer TEXT)"
  );
});

module.exports = db;
