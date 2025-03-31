const Score = require('../models/Score');
const User = require('../models/User');

exports.saveScore = async (req, res) => {
  try {
    const { totalQuestions, correctAnswers, questions } = req.body;
    const userId = req.user._id;
    
    const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);
    
    const newScore = new Score({
      user: userId,
      totalQuestions,
      correctAnswers,
      score: scorePercentage,
      details: questions.map(q => ({
        questionId: q.questionId,
        question: q.question,
        userAnswer: q.userAnswer,
        correctAnswer: q.correctAnswer,
        isCorrect: q.isCorrect
      }))
    });
    
    await newScore.save();
    
    await User.findByIdAndUpdate(userId, {
      $push: { scores: newScore._id }
    });
    
    res.status(201).json({ message: 'Resultados guardados', score: newScore });
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar resultados', error });
  }
};

exports.getUserScores = async (req, res) => {
  try {
    const scores = await Score.find({ user: req.user._id })
      .sort({ evaluationDate: -1 })
      .populate('details.questionId', 'nivel');
    res.json(scores);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener resultados', error });
  }
};