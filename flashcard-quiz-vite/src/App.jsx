import { useState, useEffect } from "react";
import { format } from "date-fns";
import UserForm from "./components/UserForm";
import { questions } from "./data/questions";
import History from "./components/History";
import Timer from "./components/Timer";
import QuestionCard from "./components/QuestionCard";
import ResultModal from "./components/ResultModal";

import './App.css';
function App() {
  const [userName, setUserName] = useState("");
  const [quizStarted, setQuizStarted] = useState(false); // Quiz'in başlatılıp başlatılmadığını kontrol eder
  const [quizFinished, setQuizFinished] = useState(false); // Quiz'in bitip bitmediğini kontrol eder
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); //
  const [score, setScore] = useState(0); // Kullanıcının puanı
  const [timeLeft, setTimeLeft] = useState(60); // Kalan süre
  const [showSolutionCount, setShowSolutionCount] = useState(0); // Çözüm gösterim sayısı
  const [history, setHistory] = useState([]); // Quiz geçmişi

  useEffect(() => {
    const savedHistory = localStorage.getItem('quizHistory')
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }
  }, [])

  const startQuiz = (name) => {
    setUserName(name)
    setQuizStarted(true)
    setQuizFinished(false)
    setCurrentQuestionIndex(0)
    setScore(0)
    setTimeLeft(300)
    setShowSolutionCount(0)
  }

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1)

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      finishQuiz()
    }
  }

  const handleTimeUp = () => finishQuiz()

  const finishQuiz = () => {
    setQuizFinished(true)

    const newHistoryItem = {
      date: format(new Date(), 'dd.MM.yyyy HH:mm'),
      name: userName,
      score: score,
      total: questions.length,
      percentage: Math.round((score / questions.length) * 100),
      timeSpent: 300 - timeLeft,
      usedHints: showSolutionCount
    }

    const updatedHistory = [...history, newHistoryItem]
    setHistory(updatedHistory)
    localStorage.setItem('quizHistory', JSON.stringify(updatedHistory))
  }

  const restartQuiz = () => {
    setQuizStarted(false)
    setQuizFinished(false)
  }

  return (
    <div className="container">
      {!quizStarted && !quizFinished ? (
        <>
          <UserForm onStartQuiz={startQuiz} />
          <History history={history} />
        </>
      ) : quizFinished ? (
        <ResultModal
          score={score}
          totalQuestions={questions.length}
          onRestart={restartQuiz}
          userName={userName}
          timeSpent={300 - timeLeft}
        />
      ) : (
        <>
          <h2>React Flash Card Quiz - Hoş geldin, {userName}!</h2>
          <Timer
            initialTime={timeLeft}
            onTimeUp={handleTimeUp}
          />

          <div className="progress">
            Soru {currentQuestionIndex + 1} / {questions.length}
          </div>

          <QuestionCard
            questionData={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            onShowSolution={() => setShowSolutionCount(prev => prev + 1)}
            isLastQuestion={currentQuestionIndex === questions.length - 1}
          />
        </>
      )}
    </div>
  )
}

export default App