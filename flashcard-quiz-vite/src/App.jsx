import { useState, useEffect } from "react";
import {format} from "date-fns/format";
import UserForm from "./components/UserForm";
import Quiz from "./components/Quiz";
import { questions } from "./data/questions";
import History from "./components/History";
import Timer from "./components/Timer";
import QuestionCard from "./components/QuestionCard";
import Result from "./components/Result";
import ResultModal from "./components/ResultModal";

import "./styles.css";

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
    const savedHistory = JSON.parse(localStorage.getItem("quizHistory"));
    if (savedHistory && Array.isArray(savedHistory) && savedHistory.length > 0) {
      setHistory(savedHistory);
    }
  }, []); // Uygulama ilk yüklendiğinde geçmişi yükler

}
  const startQuiz = () => {
    setQuizStarted(true);
    setQuizFinished(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(60); // Başlangıçta 60 saniye süre
    setShowSolutionCount(0); // Çözüm gösterim sayısını sıfırla
  }
  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    if (currentQuestionIndex + 1 === questions.length) {
      setQuizFinished(true);
      saveHistory();
    }
  }
  const saveHistory = () => {
    const newEntry = {
      userName,
      score,
      date: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
    };
    const updatedHistory = [...history, newEntry];
    setHistory(updatedHistory);
    localStorage.setItem("quizHistory", JSON.stringify(updatedHistory));
  }
  const handleTimeUp = () => {
    setQuizFinished(true);
    saveHistory();
  }
