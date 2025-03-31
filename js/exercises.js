// Variable global para almacenar el ejercicio actual
let currentExercise;

// Función para cargar un ejercicio aleatorio desde la API
async function loadRandomExercise() {
    try {
        const response = await fetch('/api/exercise/random');
        
        if (!response.ok) {
            throw new Error('Error al cargar el ejercicio');
        }
        
        currentExercise = await response.json();
        
        // Mostrar la pregunta
        document.getElementById('question').textContent = currentExercise.pregunta;

        // Agregar las opciones al HTML
        const optionsContainer = document.getElementById('options');
        optionsContainer.innerHTML = '';

        currentExercise.opciones.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option');
            optionsContainer.appendChild(button);

            button.addEventListener('click', () => {
                // Marcar la opción seleccionada
                optionsContainer.querySelectorAll('button').forEach(btn => {
                    btn.classList.remove('selected');
                });
                button.classList.add('selected');
                
                // Limpiar respuesta anterior
                document.getElementById('response').textContent = '';
                document.getElementById('response').className = '';
            });
        });
        
    } catch (error) {
        console.error("Error al cargar el ejercicio:", error);
        document.getElementById('question').textContent = "Error al cargar el ejercicio. Por favor, recarga la página.";
    }
}

// Cargar el primer ejercicio al iniciar
loadRandomExercise();

// Verificar respuesta seleccionada
document.getElementById('checkAnswerButton').addEventListener('click', () => {
    const selectedOption = document.querySelector('.option.selected');
    const responseElement = document.getElementById('response');
    
    if (selectedOption) {
        const isCorrect = selectedOption.textContent === currentExercise.respuesta_correcta;
        
        if (isCorrect) {
            selectedOption.classList.add('correct');
            responseElement.textContent = "¡Correcto! " + currentExercise.explicacion;
            responseElement.className = 'correct-response';
        } else {
            selectedOption.classList.add('incorrect');
            responseElement.textContent = "Incorrecto. " + currentExercise.explicacion;
            responseElement.className = 'incorrect-response';
        }
    } else {
        responseElement.textContent = "Por favor, selecciona una opción primero.";
        responseElement.className = 'info-response';
    }
});

// Mostrar la respuesta correcta
document.getElementById('showAnswerButton').addEventListener('click', () => {
    const allOptions = document.querySelectorAll('.option');
    const responseElement = document.getElementById('response');
    
    allOptions.forEach(option => {
        if (option.textContent === currentExercise.respuesta_correcta) {
            option.classList.add('correct');
        }
    });

    responseElement.textContent = "La respuesta correcta es: " + currentExercise.respuesta_correcta + ". " + currentExercise.explicacion;
    responseElement.className = 'correct-response';
});

// Botón para siguiente pregunta
document.getElementById('nextQuestionButton').addEventListener('click', loadRandomExercise);