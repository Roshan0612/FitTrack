require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

const authRoutes =require("./Routes/authRoutes")



mongoose.connect(process.env.MONGO_URI, {
  
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));


app.use("/api/auth/",authRoutes);

app.get('/', (req, res) => {
  res.send('Hello from Express + MongoDB Atlas!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
