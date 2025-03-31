// models/Stack.js
const mongoose = require("mongoose");

const stackSchema = new mongoose.Schema({
  items: [String]  // Almacena los valores del Stack en un array
});

module.exports = mongoose.model("Stack", stackSchema);
