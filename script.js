// Quiz questions array
const quizQuestions = [
    {
        question: "What is the capital of France?",
        answer: "paris"
    },
    {
        question: "What is 5 + 3?",
        answer: "8"
    },
    {
        question: "Which planet is closest to the Sun?",
        answer: "mercury"
    },
    {
        question: "What is the largest ocean on Earth?",
        answer: "pacific"
    },
    {
        question: "How many sides does a triangle have?",
        answer: "3"
    },
    {
        question: "What language runs this quiz?",
        answer: "javascript"
    }
];

let currentQuestionIndex = 0;
let score = 0;

// DOM elements
const questionEl = document.getElementById('question');
const answerInput = document.getElementById('answer-input');
const submitBtn = document.getElementById('submit-btn');
const feedbackEl = document.getElementById('feedback');
const quizContainer = document.getElementById('quiz-container');
const scoreSection = document.getElementById('score-section');
const finalScoreEl = document.getElementById('final-score');
const totalQuestionsEl = document.getElementById('total-questions');
const restartBtn = document.getElementById('restart-btn');

// Main quiz function
function runQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

// Show current question
function showQuestion() {
    if (currentQuestionIndex < quizQuestions.length) {
        const currentQuestion = quizQuestions[currentQuestionIndex];
        questionEl.textContent = currentQuestion.question;
        answerInput.value = '';
        answerInput.focus();
        feedbackEl.classList.add('hidden');
        submitBtn.onclick = checkAnswer;
    } else {
        showFinalScore();
    }
}

// Check answer
function checkAnswer() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    let userAnswer = answerInput.value.toLowerCase().trim();
    
    if (userAnswer === currentQuestion.answer) {
        score++;
        showFeedback('✅ Correct! Well done!', 'correct');
    } else {
        showFeedback(`❌ Wrong! Correct answer: "${currentQuestion.answer}"`, 'wrong');
    }
    
    currentQuestionIndex++;
    setTimeout(showQuestion, 2000); // Next question after 2 seconds
}

// Show feedback
function showFeedback(message, type) {
    feedbackEl.textContent = message;
    feedbackEl.className = `feedback ${type}`;
    feedbackEl.classList.remove('hidden');
}

// Show final score
function showFinalScore() {
    quizContainer.classList.add('hidden');
    scoreSection.classList.remove('hidden');
    finalScoreEl.textContent = score;
    totalQuestionsEl.textContent = quizQuestions.length;
    const percentage = Math.round((score / quizQuestions.length) * 100);
    
    // Add percentage to score display
    finalScoreEl.textContent += ` (${percentage}%)`;
}

// Restart quiz
function restartQuiz() {
    quizContainer.classList.remove('hidden');
    scoreSection.classList.add('hidden');
    runQuiz();
}

// Event listeners
submitBtn.onclick = checkAnswer;
restartBtn.onclick = restartQuiz;

// Enter key support
answerInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});

// Start quiz on page load
runQuiz();
