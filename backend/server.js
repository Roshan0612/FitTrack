const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use(express.json());

app.use((req, res, next) => {
  console.log(`🔍 ${req.method} ${req.url}`);
  next();
});

const authRoutes = require("./Routes/authRoutes");
app.use("/api/auth", authRoutes);

app.get('/', (req, res) => {
  res.send('Hello from Express + MongoDB Atlas!');
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
 