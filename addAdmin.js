const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database/cbt.db"); // Ganti dengan jalur ke database Anda
const bcrypt = require("bcryptjs");

const createAdminAccount = () => {
  const adminUsername = "admin2"; // Ganti dengan username yang diinginkan
  const adminPassword = "admin123"; // Ganti dengan password yang diinginkan
  const adminRole = "admin"; // Role untuk admin

  db.serialize(() => {
    // Memeriksa apakah akun admin sudah ada
    db.get(
      `SELECT * FROM users WHERE username = ?`,
      [adminUsername],
      (err, row) => {
        if (err) {
          console.error("Error checking for existing admin:", err.message);
          return db.close(); // Pastikan untuk menutup koneksi jika terjadi kesalahan
        }

        if (row) {
          console.log("Admin account already exists.");
          return db.close(); // Menutup koneksi jika akun sudah ada
        } else {
          // Hash password sebelum menyimpan
          const hashedPassword = bcrypt.hashSync(adminPassword, 10);

          // Menambahkan akun admin baru ke database
          db.run(
            `INSERT INTO users (username, password, role) VALUES (?, ?, ?)`,
            [adminUsername, hashedPassword, adminRole],
            function (err) {
              if (err) {
                console.error("Error creating admin account:", err.message);
              } else {
                console.log("Admin account created successfully.");
              }
              db.close(); // Menutup koneksi setelah semua operasi selesai
            }
          );
        }
      }
    );
  });
};

// Memanggil fungsi untuk membuat akun admin
createAdminAccount();
