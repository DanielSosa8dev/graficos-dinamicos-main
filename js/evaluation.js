// Variables globales
let questions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;
let isReviewMode = false;

// Elementos del DOM
const quizContent = document.getElementById('quizContent');
const resultsContainer = document.getElementById('resultsContainer');
const questionNumberElement = document.getElementById('questionNumber');
const questionTextElement = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const progressBar = document.getElementById('progressBar');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const submitButton = document.getElementById('submitButton');
const finalScoreElement = document.getElementById('finalScore');
const resultMessageElement = document.getElementById('resultMessage');
const restartButton = document.getElementById('restartButton');

// Función para mezclar un array (Fisher-Yates)
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Cargar preguntas desde la API
async function loadQuestions() {
    try {
        const response = await fetch('/api/exercise/evaluation');
        
        if (!response.ok) {
            throw new Error('Error al cargar las preguntas');
        }
        
        questions = await response.json();
        
        if (!questions || questions.length === 0) {
            throw new Error('No se encontraron preguntas');
        }
        
        // Mezclar y seleccionar 10 preguntas
        questions = shuffleArray(questions).slice(0, 10);
        
        // Inicializar array de respuestas
        userAnswers = Array(questions.length).fill(null);
        score = 0;
        currentQuestionIndex = 0;
        isReviewMode = false;
        
        showQuestion(currentQuestionIndex);
    } catch (error) {
        console.error("Error al cargar las preguntas:", error);
        questionTextElement.textContent = "Error al cargar las preguntas. Por favor, recarga la página.";
        nextButton.disabled = true;
        submitButton.disabled = true;
    }
}

// Mostrar una pregunta
function showQuestion(index) {
    const question = questions[index];
    
    // Actualizar UI
    questionNumberElement.textContent = `Pregunta ${index + 1} de ${questions.length}`;
    progressBar.style.width = `${((index + 1) / questions.length) * 100}%`;
    questionTextElement.textContent = question.pregunta;
    
    // Limpiar opciones anteriores
    optionsContainer.innerHTML = '';
    
    // Mostrar opciones (en modo revisión no mezclamos)
    const optionsToShow = isReviewMode ? question.opciones : shuffleArray([...question.opciones]);
    
    // Crear botones de opciones
    optionsToShow.forEach(option => {
        const optionButton = document.createElement('button');
        optionButton.className = 'option';
        optionButton.textContent = option;
        
        // Marcar opción seleccionada si existe
        if (userAnswers[index] === option) {
            optionButton.classList.add('selected');
        }
        
        // En modo revisión, marcar respuestas correctas/incorrectas
        if (isReviewMode) {
            if (option === question.respuesta_correcta) {
                optionButton.classList.add('correct');
            } else if (option === userAnswers[index] && option !== question.respuesta_correcta) {
                optionButton.classList.add('incorrect');
            }
        }
        
        // Solo permitir selección si no estamos en modo revisión
        if (!isReviewMode) {
            optionButton.addEventListener('click', () => selectOption(option, index));
        }
        
        optionsContainer.appendChild(optionButton);
    });
    
    // Actualizar botones de navegación
    updateNavigationButtons(index);
}

// Actualizar botones de navegación
function updateNavigationButtons(index) {
    // Mostrar/ocultar botón Anterior
    prevButton.style.display = index > 0 ? 'block' : 'none';
    
    // Mostrar/ocultar botón Siguiente/Verificar
    if (index === questions.length - 1) {
        nextButton.style.display = 'none';
        submitButton.style.display = 'block';
        submitButton.textContent = isReviewMode ? 'Finalizar Evaluación' : 'Verificar Respuestas';
    } else {
        nextButton.style.display = 'block';
        submitButton.style.display = 'none';
    }
}

// Seleccionar una opción
function selectOption(selectedOption, questionIndex) {
    userAnswers[questionIndex] = selectedOption;
    
    // Actualizar selección visual
    const options = optionsContainer.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.remove('selected');
        if (option.textContent === selectedOption) {
            option.classList.add('selected');
        }
    });
}

// Iniciar modo revisión
function startReview() {
    isReviewMode = true;
    currentQuestionIndex = 0;
    showQuestion(currentQuestionIndex);
}

// Finalizar evaluación y mostrar resultados
function finishEvaluation() {
    // Calcular puntaje
    score = questions.reduce((total, question, index) => {
        return total + (userAnswers[index] === question.respuesta_correcta ? 1 : 0);
    }, 0);
    
    // Mostrar resultados
    showResults();
    
    // Opcional: Guardar resultados en el servidor
    saveResults();
}

// Mostrar resultados finales
function showResults() {
    quizContent.style.display = 'none';
    resultsContainer.style.display = 'block';
    
    finalScoreElement.textContent = `${score}/${questions.length}`;
    
    // Mostrar mensaje según el puntaje
    if (score === questions.length) {
        resultMessageElement.textContent = "¡Excelente! Dominas completamente los conceptos de Stack.";
    } else if (score >= questions.length * 0.7) {
        resultMessageElement.textContent = "¡Buen trabajo! Tienes un buen entendimiento de los Stacks.";
    } else if (score >= questions.length * 0.5) {
        resultMessageElement.textContent = "No está mal, pero podrías repasar algunos conceptos de Stack.";
    } else {
        resultMessageElement.textContent = "Sería bueno que repases los conceptos básicos de Stack antes de continuar.";
    }
}

// Guardar resultados en el servidor
async function saveResults() {
    try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await fetch('/api/results/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                score: score,
                total: questions.length,
                answers: userAnswers.map((answer, index) => ({
                    questionId: questions[index]._id,
                    userAnswer: answer,
                    isCorrect: answer === questions[index].respuesta_correcta
                }))
            })
        });

        if (!response.ok) {
            console.error('Error al guardar resultados');
        }
    } catch (error) {
        console.error('Error al guardar resultados:', error);
    }
}

// Reiniciar evaluación
function restartQuiz() {
    quizContent.style.display = 'block';
    resultsContainer.style.display = 'none';
    loadQuestions();
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    prevButton.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion(currentQuestionIndex);
        }
    });
    
    nextButton.addEventListener('click', () => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
        }
    });
    
    submitButton.addEventListener('click', () => {
        if (isReviewMode) {
            finishEvaluation();
        } else {
            startReview();
        }
    });
    
    restartButton.addEventListener('click', restartQuiz);
    
    // Iniciar la evaluación
    loadQuestions();
});