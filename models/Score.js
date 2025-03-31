const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalQuestions: { type: Number, required: true },
  correctAnswers: { type: Number, required: true },
  score: { type: Number, required: true },
  evaluationDate: { type: Date, default: Date.now },
  details: [{
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' },
    question: String,
    userAnswer: String,
    correctAnswer: String,
    isCorrect: Boolean
  }]
});

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;