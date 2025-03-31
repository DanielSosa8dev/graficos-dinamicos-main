// routes/exerciseRoutes.js
const express = require('express');
const Exercise = require('../models/Exercise');
const router = express.Router();

// Ruta para obtener un ejercicio aleatorio
router.get('/random', async (req, res) => {
  try {
    const count = await Exercise.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const randomExercise = await Exercise.find().skip(randomIndex).limit(1);

    if (randomExercise.length === 0) {
      return res.status(404).json({ message: "No hay ejercicios disponibles" });
    }

    res.json(randomExercise[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el ejercicio aleatorio', error });
  }
});

// Agregar esta nueva ruta
router.get('/evaluation', async (req, res) => {
  try {
      // Obtener 10 ejercicios aleatorios
      const exercises = await Exercise.aggregate([{ $sample: { size: 10 } }]);
      res.json(exercises);
  } catch (error) {
      res.status(500).json({ message: 'Error al obtener ejercicios para evaluación', error });
  }
});

module.exports = router;
