const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const questionRoutes = require("./routes/questionRoutes");
const answerRoutes = require("./routes/answerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/profileRoutes");
const accessTokenRoutes = require("./routes/accessTokenRoutes");

require("dotenv").config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://your-frontend-deployed-domain.com", // Ganti dengan domain frontend Anda
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());
app.use(bodyParser.json());

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

app.get("/", (req, res) => {
  res.send("Welcome to the Quiz API");
});
