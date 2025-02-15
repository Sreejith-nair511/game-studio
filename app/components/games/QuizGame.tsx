"use client"

import { useState } from "react"

const questions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
    correctAnswer: "Leonardo da Vinci",
  },
  {
    question: "What is the largest mammal in the world?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: "Blue Whale",
  },
  {
    question: "In which year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    correctAnswer: "1945",
  },
]

export default function QuizGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer)
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    setTimeout(() => {
      setSelectedAnswer(null)
      const nextQuestion = currentQuestion + 1
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion)
      } else {
        setShowScore(true)
      }
    }, 1000)
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowScore(false)
    setSelectedAnswer(null)
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      {showScore ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            You scored {score} out of {questions.length}
          </h2>
          <button onClick={restartQuiz} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Restart Quiz
          </button>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <span className="text-lg font-bold">Question {currentQuestion + 1}</span>/{questions.length}
          </div>
          <h2 className="text-xl mb-4">{questions[currentQuestion].question}</h2>
          <div className="space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(option)}
                className={`w-full p-2 text-left rounded ${
                  selectedAnswer === option
                    ? option === questions[currentQuestion].correctAnswer
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                disabled={selectedAnswer !== null}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

