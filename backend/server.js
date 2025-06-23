const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./Routes/authRoutes");
const path = require("path");
const exerciseRoutes = require("./Routes/exerciseRoutes"); 
const dietRoutes = require("./Routes/dietRoutes");
const subscriptionRoutes=require("./Routes/subscriptionRoutes")

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use((req, res, next) => {
  console.log(`🔍 ${req.method} ${req.url}`);
  next();
});


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/exercises", exerciseRoutes);
app.use("/api/v1/diet", dietRoutes);

app.use("/api/v1/subscription",subscriptionRoutes)


app.get("/", (req, res) => {
  res.send("API is working!");
});


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(" MongoDB connected");
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
