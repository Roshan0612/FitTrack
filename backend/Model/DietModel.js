const mongoose = require("mongoose");

const dietSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ["veg", "non-veg"], // ✅ Removed "vegan"
    required: true
  },
  gifUrl: { type: String },
  protein: { type: Number, required: true },
  fat: { type: Number, required: true },
  carbs: { type: Number, required: true },
  calories: { type: Number, required: true }
});

module.exports = mongoose.model("Diet", dietSchema);
