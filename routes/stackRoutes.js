// routes/stackRoutes.js
const express = require("express");
const router = express.Router();
const Stack = require("../models/Stack");

// Obtener el Stack completo
router.get("/", async (req, res) => {
  try {
    let stackDoc = await Stack.findOne();
    if (!stackDoc) {
      stackDoc = new Stack({ items: [] });
      await stackDoc.save();
    }
    res.json({ stack: stackDoc.items });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el stack" });
  }
});

// Push: Agregar un elemento
router.post("/push", async (req, res) => {
  try {
    const { value } = req.body;
    if (!value) {
      return res.status(400).json({ error: "Debe enviar un valor" });
    }

    let stackDoc = await Stack.findOne();
    if (!stackDoc) {
      stackDoc = new Stack({ items: [] });
    }

    stackDoc.items.push(value);
    await stackDoc.save();
    res.json({ stack: stackDoc.items });
  } catch (error) {
    res.status(500).json({ error: "Error al hacer push al stack" });
  }
});

// Pop: Eliminar el último elemento
router.post("/pop", async (req, res) => {
  try {
    const stackDoc = await Stack.findOne();
    if (!stackDoc || stackDoc.items.length === 0) {
      return res.status(400).json({ error: "El stack está vacío" });
    }

    stackDoc.items.pop(); // Remueve el último elemento
    await stackDoc.save();
    res.json({ stack: stackDoc.items });
  } catch (error) {
    res.status(500).json({ error: "Error al hacer pop del stack" });
  }
});

// Peek: Obtener el último elemento sin eliminarlo
router.get("/peek", async (req, res) => {
  try {
    const stackDoc = await Stack.findOne();
    if (!stackDoc || stackDoc.items.length === 0) {
      return res.status(400).json({ error: "El stack está vacío" });
    }

    // El tope del stack es el último elemento del arreglo
    const topElement = stackDoc.items[stackDoc.items.length - 1];
    res.json({ top: topElement });
  } catch (error) {
    res.status(500).json({ error: "Error al hacer peek" });
  }
});

// isEmpty: Verifica si el Stack está vacío
router.get("/isEmpty", async (req, res) => {
  try {
    const stackDoc = await Stack.findOne();
    if (!stackDoc || stackDoc.items.length === 0) {
      // Retornamos isEmpty = true si no hay documento o el array está vacío
      return res.json({ isEmpty: true });
    }

    // Si el array tiene elementos
    return res.json({ isEmpty: false });
  } catch (error) {
    res.status(500).json({ error: "Error al verificar si el stack está vacío" });
  }
});

module.exports = router;
