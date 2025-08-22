import React, { useState } from 'react'
import { Award, CheckCircle, XCircle, RotateCcw, ArrowRight, Shield } from 'lucide-react'

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)

  const questions = [
    {
      question: "What should you do if you receive an SMS claiming your bank account is suspended?",
      options: [
        "Click the link immediately to verify",
        "Call the number provided in the SMS",
        "Ignore it and contact your bank directly",
        "Share your OTP to verify your identity"
      ],
      correct: 2,
      explanation: "Never click on suspicious links or call unknown numbers. Always contact your bank directly using their official number to verify any account issues."
    },
    {
      question: "Which of the following is a safe practice for UPI transactions?",
      options: [
        "Share your UPI PIN with trusted friends",
        "Use any QR code you find at shops",
        "Verify the UPI ID before making payment",
        "Accept payment requests from unknown numbers"
      ],
      correct: 2,
      explanation: "Always verify the UPI ID before making any payment. Never share your UPI PIN with anyone, including friends and family."
    },
    {
      question: "What should you do if someone calls claiming to be from your bank and asks for OTP?",
      options: [
        "Share the OTP immediately",
        "Hang up and call your bank's official number",
        "Give them your account number",
        "Tell them your password"
      ],
      correct: 1,
      explanation: "Banks never ask for OTP over phone calls. Hang up immediately and call your bank's official number to verify if there's any issue."
    },
    {
      question: "Which password is the most secure?",
      options: [
        "password123",
        "MyName2024",
        "P@ssw0rd!2024#Secure",
        "123456789"
      ],
      correct: 2,
      explanation: "A strong password should be at least 12 characters long and include uppercase, lowercase, numbers, and special characters."
    },
    {
      question: "What should you do if you receive an email about winning a prize?",
      options: [
        "Click the link to claim immediately",
        "Reply with your bank details",
        "Ignore it as it's likely a scam",
        "Forward it to friends"
      ],
      correct: 2,
      explanation: "If something sounds too good to be true, it usually is. Legitimate prizes don't require you to pay fees or share personal information."
    },
    {
      question: "Which of the following is safe to share on social media?",
      options: [
        "Your Aadhaar number",
        "Your home address",
        "Your vacation photos (after returning)",
        "Your bank account details"
      ],
      correct: 2,
      explanation: "Only share vacation photos after you've returned home. Never share personal documents, addresses, or financial information on social media."
    },
    {
      question: "What should you do if you suspect you've been scammed?",
      options: [
        "Keep it to yourself",
        "Report it to cybercrime.gov.in or call 1930",
        "Try to get revenge on the scammer",
        "Share it only on social media"
      ],
      correct: 1,
      explanation: "Always report cyber crimes to official authorities. This helps prevent others from falling victim to the same scam."
    },
    {
      question: "Which of the following is a red flag for online shopping scams?",
      options: [
        "Secure payment gateway",
        "Unrealistically low prices",
        "Customer reviews",
        "Return policy"
      ],
      correct: 1,
      explanation: "Unrealistically low prices are often a sign of scams. If a deal seems too good to be true, it probably is."
    }
  ]

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex)
    setShowExplanation(true)
  }

  const handleNext = () => {
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1)
    }
    
    setSelectedAnswer(null)
    setShowExplanation(false)
    
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowResults(false)
    setSelectedAnswer(null)
    setShowExplanation(false)
  }

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 80) return "Excellent! You're very cyber-safe!"
    if (percentage >= 60) return "Good job! You have solid cyber safety knowledge."
    if (percentage >= 40) return "Not bad! You know some basics but need to learn more."
    return "You need to improve your cyber safety knowledge. Keep learning!"
  }

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-blue-600"
    if (percentage >= 40) return "text-yellow-600"
    return "text-red-600"
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Award className="h-16 w-16 text-primary-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Quiz Complete!</h1>
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <div className={`text-6xl font-bold mb-4 ${getScoreColor()}`}>
                {score}/{questions.length}
              </div>
              <div className={`text-2xl font-semibold mb-4 ${getScoreColor()}`}>
                {Math.round((score / questions.length) * 100)}%
              </div>
              <p className="text-xl text-gray-600 mb-6">{getScoreMessage()}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Correct Answers</h3>
                  <div className="text-2xl font-bold text-green-600">{score}</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-800 mb-2">Incorrect Answers</h3>
                  <div className="text-2xl font-bold text-red-600">{questions.length - score}</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleRestart}
                  className="btn-primary flex items-center justify-center space-x-2"
                >
                  <RotateCcw className="h-5 w-5" />
                  <span>Take Quiz Again</span>
                </button>
              </div>
            </div>

            {/* Safety Tips Based on Score */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">Safety Recommendations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Essential Practices</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Never share OTP with anyone</li>
                    <li>• Verify before sharing information</li>
                    <li>• Use strong, unique passwords</li>
                    <li>• Enable 2FA on all accounts</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Emergency Contacts</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Cyber Crime: 1930</li>
                    <li>• Police: 100</li>
                    <li>• Women Helpline: 1091</li>
                    <li>• Report online: cybercrime.gov.in</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const currentQ = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Award className="h-12 w-12 text-primary-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cyber Safety Quiz</h1>
          <p className="text-xl text-gray-600">Test your knowledge and learn about cyber safety</p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-700">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-700">
              Score: {score}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{currentQ.question}</h2>
          
          <div className="space-y-4">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswer === index
                    ? index === currentQ.correct
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : selectedAnswer !== null && index === currentQ.correct
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswer === index
                      ? index === currentQ.correct
                        ? 'border-green-500 bg-green-500'
                        : 'border-red-500 bg-red-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswer === index && (
                      index === currentQ.correct ? (
                        <CheckCircle className="h-4 w-4 text-white" />
                      ) : (
                        <XCircle className="h-4 w-4 text-white" />
                      )
                    )}
                  </div>
                  <span className="text-gray-900">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">Explanation</h3>
                  <p className="text-blue-800">{currentQ.explanation}</p>
                </div>
              </div>
            </div>
          )}

          {/* Next Button */}
          {showExplanation && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleNext}
                className="btn-primary flex items-center space-x-2"
              >
                <span>
                  {currentQuestion + 1 === questions.length ? 'See Results' : 'Next Question'}
                </span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        {/* Safety Tip */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <Shield className="h-6 w-6 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-1">Safety Tip</h3>
              <p className="text-yellow-800">
                Remember: When in doubt, always verify information from official sources before taking any action.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quiz
