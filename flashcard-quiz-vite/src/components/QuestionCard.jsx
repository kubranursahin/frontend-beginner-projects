import { useState } from 'react'

const QuestionCard = ({ 
  questionData, 
  onAnswer, 
  onShowSolution,
  isLastQuestion 
}) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)

  const handleSubmit = () => {
    if (selectedOption) {
      onAnswer(selectedOption === questionData.correctAnswer)
      setSelectedOption(null)
      setShowExplanation(false)
    }
  }

  const toggleExplanation = () => {
    setShowExplanation(!showExplanation)
    onShowSolution()
  }

  return (
    <div className="question-card">
      <h3>Soru {questionData.id}: {questionData.question}</h3>
      
      <div className="options">
        {questionData.options.map((option, index) => (
          <div 
            key={index} 
            className={`option ${selectedOption === option ? 'selected' : ''}`}
            onClick={() => setSelectedOption(option)}
          >
            {option}
          </div>
        ))}
      </div>

      {showExplanation && (
        <div className="explanation">
          <h4>Açıklama:</h4>
          <p>{questionData.explanation}</p>
        </div>
      )}

      <div className="actions">
        <button onClick={toggleExplanation}>
          {showExplanation ? 'Açıklamayı Gizle' : 'Çözümü Göster'}
        </button>
        <button onClick={handleSubmit} disabled={!selectedOption}>
          {isLastQuestion ? 'Testi Bitir' : 'Sonraki Soru'}
        </button>
      </div>
    </div>
  )
}

export default QuestionCard