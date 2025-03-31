const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  pregunta: { type: String, required: true },
  opciones: { type: [String], required: true }, // Array de opciones
  respuesta_correcta: { type: String, required: true }, // Respuesta correcta
  nivel: { type: String, required: true }, // Nivel del ejercicio
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
