const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database/cbt.db"); // Ganti dengan jalur ke database Anda

// Fungsi untuk menambahkan kolom baru
const addColumn = () => {
  const columnName = "role"; // Ganti dengan nama kolom yang ingin ditambahkan
  const columnType = "TEXT"; // Ganti dengan tipe data yang sesuai (TEXT, INTEGER, dll.)

  db.serialize(() => {
    // Menjalankan perintah ALTER TABLE untuk menambahkan kolom
    db.run(
      `CREATE TABLE access_tokens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    token TEXT NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);`,
      (err) => {
        if (err) {
          console.error("Error adding column:", err.message);
        } else {
          console.log(`Column '${columnName}' added successfully.`);
        }
      }
    );
  });

  // Menutup koneksi ke database
  db.close();
};

// Memanggil fungsi untuk menambahkan kolom
addColumn();
