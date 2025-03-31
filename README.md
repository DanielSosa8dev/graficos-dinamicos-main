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

Luego inserta los ejercicios:

=======
sh
Copiar
Editar
node -v   # Verifica la versión de Node.js
npm -v    # Verifica la versión de npm
mongod --version   # Verifica la versión de MongoDB
2. Clonar el repositorio del proyecto (si aplica)
Si tienes tu proyecto en GitHub, clónalo con:

sh
Copiar
Editar
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>
Si ya tienes el código localmente, navega a la carpeta del proyecto:

sh
Copiar
Editar
cd <NOMBRE_DEL_PROYECTO>
3. Instalar las dependencias
Ejecuta el siguiente comando dentro de la carpeta de tu proyecto:

sh
Copiar
Editar
npm install
Si necesitas instalar las dependencias manualmente, usa:

sh
Copiar
Editar
npm install express cors helmet mongoose path
Si usas autenticación, instala bcrypt, jsonwebtoken y dotenv:

sh
Copiar
Editar
npm install bcrypt jsonwebtoken dotenv
Si usas EJS para plantillas HTML:

sh
Copiar
Editar
npm install ejs
4. Configurar MongoDB
Si usas MongoDB localmente, asegúrate de iniciarlo con:

sh
Copiar
Editar
mongod
Si usas MongoDB Atlas (nube), configura el archivo .env con tu conexión:

sh
Copiar
Editar
MONGODB_URI=mongodb+srv://<usuario>:<contraseña>@cluster0.mongodb.net/StackDB
5. Crear la base de datos y agregar ejercicios
Ejecuta MongoDB y usa:

sh
Copiar
Editar
mongo
use StackDB
Luego inserta los ejercicios:

sh
Copiar
Editar
>>>>>>> edbe88edade0166374adeae735a441d8b82fa1d3
db.ejercicios.insertMany([...])  # Usa los ejercicios que te proporcioné antes
6. Iniciar el servidor
Para correr el servidor Express:

<<<<<<< HEAD
npm start

Si tienes nodemon instalado (para reiniciar automáticamente):

nodemon server.js

Si no lo tienes, instálalo con:

npm install -g nodemon

=======
sh
Copiar
Editar
npm start
Si tienes nodemon instalado (para reiniciar automáticamente):

sh
Copiar
Editar
nodemon server.js
Si no lo tienes, instálalo con:

sh
Copiar
Editar
npm install -g nodemon
>>>>>>> edbe88edade0166374adeae735a441d8b82fa1d3
7. Probar la API
Si todo está bien, abre en tu navegador o Postman:

http://localhost:5000/ → Página principal

http://localhost:5000/api/exercise/random → Obtener un ejercicio aleatorio

<<<<<<< HEAD

=======
Si necesitas más rutas, revisa el archivo server.js.
>>>>>>> edbe88edade0166374adeae735a441d8b82fa1d3

