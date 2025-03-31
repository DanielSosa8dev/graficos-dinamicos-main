Para instalar y configurar todo lo necesario para ejecutar tu proyecto, sigue estos pasos:

1. Instalar Node.js y MongoDB
Si aún no tienes Node.js y MongoDB instalados, descárgalos e instálalos desde:

Node.js: https://nodejs.org/

MongoDB: https://www.mongodb.com/try/download/community

Después de la instalación, verifica que están correctamente instalados con:

<<<<<<< HEAD
node -v   # Verifica la versión de Node.js
npm -v    # Verifica la versión de npm
mongod --version   # Verifica la versión de MongoDB

2. Clonar el repositorio del proyecto (si aplica)
Si tienes tu proyecto en GitHub, clónalo con:

git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>

Si ya tienes el código localmente, navega a la carpeta del proyecto:

cd <NOMBRE_DEL_PROYECTO>

3. Instalar las dependencias
Ejecuta el siguiente comando dentro de la carpeta de tu proyecto:

npm install

Si necesitas instalar las dependencias manualmente, usa:

npm install express cors helmet mongoose path

Si usas autenticación, instala bcrypt, jsonwebtoken y dotenv:

npm install bcrypt jsonwebtoken dotenv
Si usas EJS para plantillas HTML:

npm install ejs

4. Configurar MongoDB
Si usas MongoDB localmente, asegúrate de iniciarlo con:

mongod

Si usas MongoDB Atlas (nube), configura el archivo .env con tu conexión:

MONGODB_URI=mongodb+srv://<usuario>:<contraseña>@cluster0.mongodb.net/StackDB

5. Crear la base de datos y agregar ejercicios
Ejecuta MongoDB y usa:

mongo
use StackDB

