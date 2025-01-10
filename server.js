// server.js
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const questionRoutes = require("./routes/questionRoutes");
const answerRoutes = require("./routes/answerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/profileRoutes");
const accessTokenRoutes = require("./routes/accessTokenRoutes");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Rute API
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/answers", answerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/access-tokens", accessTokenRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
