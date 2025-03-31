const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const mongoose = require("mongoose");

// Rutas
const stackRoutes = require("./routes/stackRoutes");
const authRoutes = require("./routes/authRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");

const app = express();
const PORT = 5000;

// 1. Conexión a MongoDB (StackDB)
mongoose.connect("mongodb://localhost:27017/StackDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Conectado a la base de datos StackDB"))
.catch((err) => console.error("Error de conexión a MongoDB:", err));

// 2. Configuración de Helmet con CSP
app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "http://localhost:5000"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"]
      }
    }
}));

// 3. Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// 4. Rutas
app.use("/api/auth", authRoutes);
app.use("/api/stack", stackRoutes);
app.use("/api/exercise", exerciseRoutes);

// 5. Rutas para vistas
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "register.html"));
});

app.get("/concepts", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "stackConcepts.html"));
});

app.get("/exercises", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "exercises.html"));
});

app.get('/evaluation', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'evaluation.html'));
});

// 6. Configuración de archivos estáticos
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));

// 7. Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

