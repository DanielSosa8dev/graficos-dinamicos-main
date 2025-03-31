// controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Validar campos vacíos
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }
    
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ 
        error: existingUser.username === username 
          ? "El nombre de usuario ya está en uso" 
          : "El correo electrónico ya está registrado"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    
    res.status(201).json({ 
      message: "Usuario registrado correctamente",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ error: "Error en el registro" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validar campos vacíos
    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña son requeridos" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Credenciales inválidas" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Credenciales inválidas" });

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
    
    res.json({ 
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ error: "Error en el inicio de sesión" });
  }
};