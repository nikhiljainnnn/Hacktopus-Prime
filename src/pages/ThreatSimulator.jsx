import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, ArrowRight, RefreshCw, Trophy, Zap, Target, Star, Play, Pause } from 'lucide-react';

const ThreatSimulator = () => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [userChoice, setUserChoice] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [completedScenarios, setCompletedScenarios] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);

  const scenarios = [
    {
      id: 1,
      type: "Phishing Email",
      title: "🎯 Mission: Email Detective",
      description: "A suspicious email just arrived! Can you spot the red flags?",
      difficulty: "Easy",
      content: {
        from: "security@hdfcbank-india.com",
        subject: "URGENT: Account Verification Required",
        body: `Dear Customer,

Your HDFC Bank account has been temporarily suspended due to security concerns. 
To restore access, please click the link below and verify your details:

https://hdfc-secure-verify.xyz/account-verify

This is mandatory for account security. Please complete within 24 hours.

Best regards,
HDFC Bank Security Team`
      },
      options: [
        { id: 'click', text: "Click the link and verify", isCorrect: false },
        { id: 'forward', text: "Forward to bank's official email", isCorrect: true },
        { id: 'delete', text: "Delete the email", isCorrect: true },
        { id: 'reply', text: "Reply asking for verification", isCorrect: false }
      ],
      feedback: {
        correct: "🎉 AMAZING! You're a cyber detective! You spotted the fake domain 'xyz' and urgent pressure tactics!",
        incorrect: "💥 OOPS! That was a phishing trap! Notice the suspicious 'xyz' domain and threatening urgency!"
      },
      learningPoints: [
        "🔍 Check sender's email domain carefully",
        "⚡ Beware of urgent requests for personal info",
        "🚫 Never click suspicious links",
        "📞 Contact your bank directly if unsure"
      ]
    },
    {
      id: 2,
      type: "Fake OTP Call",
      title: "📞 Mission: Call Defender",
      description: "Someone's calling claiming to be your bank! What's your move?",
      difficulty: "Medium",
      content: {
        caller: "HDFC Bank Security",
        message: "Hello, this is HDFC Bank security calling. We detected suspicious activity on your account. To secure it, please share the OTP we just sent to your phone."
      },
      options: [
        { id: 'share', text: "Share the OTP", isCorrect: false },
        { id: 'verify', text: "Ask for caller verification", isCorrect: true },
        { id: 'hangup', text: "Hang up immediately", isCorrect: true },
        { id: 'callback', text: "Call back using official number", isCorrect: true }
      ],
      feedback: {
        correct: "🛡️ BRILLIANT! You just saved your account! Banks NEVER ask for OTP over phone!",
        incorrect: "💥 DANGER! Never share OTP with anyone! Banks never ask for OTP over calls!"
      },
      learningPoints: [
        "🚫 Banks never ask for OTP over phone",
        "🔍 Always verify caller identity",
        "☎️ Use official numbers to call back",
        "🔐 OTP is for your use only"
      ]
    },
    {
      id: 3,
      type: "UPI Scam",
      title: "💳 Mission: Payment Protector",
      description: "A delivery call asking for UPI payment! Is it legit?",
      difficulty: "Hard",
      content: {
        caller: "Courier Service",
        message: "Hello, you have a package delivery. There's a small delivery charge of ₹99. Please pay via UPI to complete delivery. I'll send you the UPI ID."
      },
      options: [
        { id: 'pay', text: "Pay the delivery charge", isCorrect: false },
        { id: 'verify', text: "Ask for delivery details first", isCorrect: true },
        { id: 'refuse', text: "Refuse and hang up", isCorrect: true },
        { id: 'check', text: "Check with courier company", isCorrect: true }
      ],
      feedback: {
        correct: "🎯 SMART MOVE! You didn't fall for the fake delivery scam!",
        incorrect: "💥 SCAM ALERT! Legitimate couriers don't ask for phone payments!"
      },
      learningPoints: [
        "📦 Verify delivery details before payment",
        "🚫 Legitimate couriers don't ask for phone payments",
        "📞 Check with official courier companies",
        "⚠️ Be suspicious of unsolicited payment requests"
      ]
    },
    {
      id: 4,
      type: "Social Media Scam",
      title: "📱 Mission: Social Media Guardian",
      description: "A friend on WhatsApp is asking for money urgently! What do you do?",
      difficulty: "Medium",
      content: {
        platform: "WhatsApp",
        sender: "Your Best Friend",
        message: "Hey! I'm in trouble and need ₹5000 urgently. My phone is about to die. Please send it to this UPI ID: friend@paytm. I'll return it tomorrow!"
      },
      options: [
        { id: 'send', text: "Send the money immediately", isCorrect: false },
        { id: 'call', text: "Call your friend to verify", isCorrect: true },
        { id: 'ignore', text: "Ignore the message", isCorrect: true },
        { id: 'ask', text: "Ask for voice note verification", isCorrect: true }
      ],
      feedback: {
        correct: "🛡️ EXCELLENT! You protected yourself from a social media scam!",
        incorrect: "💥 SCAM ALERT! This could be a hacked account or impersonator!"
      },
      learningPoints: [
        "📞 Always verify urgent requests with a phone call",
        "🔍 Check if the person's writing style matches",
        "⚠️ Be suspicious of urgent money requests",
        "🎤 Ask for voice verification if suspicious"
      ]
    },
    {
      id: 5,
      type: "Fake Job Offer",
      title: "💼 Mission: Job Offer Investigator",
      description: "You received a job offer via email! Is it legitimate?",
      difficulty: "Hard",
      content: {
        from: "hr@techcompany-india.com",
        subject: "Congratulations! You're Hired - Work from Home",
        body: `Dear Candidate,

Congratulations! We are pleased to offer you a position as Remote Data Entry Specialist.
Salary: ₹25,000 per month
Work from home, flexible hours

To complete your onboarding, please:
1. Pay ₹2000 for training materials
2. Share your Aadhaar and PAN details
3. Provide your bank account details

Reply with your details to proceed.

Best regards,
HR Team
Tech Company India`
      },
      options: [
        { id: 'pay', text: "Pay the training fee and share details", isCorrect: false },
        { id: 'research', text: "Research the company online", isCorrect: true },
        { id: 'ignore', text: "Ignore the offer", isCorrect: true },
        { id: 'verify', text: "Contact company through official channels", isCorrect: true }
      ],
      feedback: {
        correct: "🎯 SMART THINKING! Legitimate companies never ask for upfront payments!",
        incorrect: "💥 JOB SCAM! Real companies don't ask for money or personal details upfront!"
      },
      learningPoints: [
        "💰 Legitimate companies never ask for upfront payments",
        "🔍 Always research companies before sharing details",
        "📞 Contact companies through official channels",
        "🛡️ Never share Aadhaar/PAN without verification"
      ]
    }
  ];

  const handleChoice = (choice) => {
    setIsAnimating(true);
    setUserChoice(choice);
    
    setTimeout(() => {
      setShowFeedback(true);
      setIsAnimating(false);
      
      if (choice.isCorrect) {
        setScore(score + 10);
      }
      
      setCompletedScenarios([...completedScenarios, currentScenario]);
    }, 500);
  };

  const nextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setUserChoice(null);
      setShowFeedback(false);
    }
  };

  const resetSimulator = () => {
    setCurrentScenario(0);
    setUserChoice(null);
    setShowFeedback(false);
    setScore(0);
    setCompletedScenarios([]);
    setGameStarted(false);
    setShowIntro(true);
  };

  const startGame = () => {
    setShowIntro(false);
    setGameStarted(true);
  };

  const currentScenarioData = scenarios[currentScenario];
  const progressPercentage = ((currentScenario + 1) / scenarios.length) * 100;

  if (showIntro) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center text-white max-w-2xl mx-auto px-4">
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Shield className="h-24 w-24 text-yellow-400 animate-pulse" />
                <Zap className="h-8 w-8 text-yellow-400 absolute -top-2 -right-2 animate-bounce" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              CYBER DEFENDER
            </h1>
            <p className="text-xl text-blue-200 mb-6">
              🎮 The Ultimate Cyber Safety Training Game
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">🎯 Your Mission:</h2>
            <div className="space-y-3 text-left">
              <div className="flex items-center space-x-3">
                <Target className="h-6 w-6 text-green-400" />
                <span>Identify phishing emails and fake calls</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-blue-400" />
                <span>Protect yourself from UPI scams</span>
              </div>
              <div className="flex items-center space-x-3">
                <Star className="h-6 w-6 text-yellow-400" />
                <span>Earn points and become a cyber hero!</span>
              </div>
            </div>
          </div>

          <button
            onClick={startGame}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-4 px-8 rounded-full text-xl hover:from-yellow-300 hover:to-orange-400 transform hover:scale-105 transition-all duration-200 flex items-center space-x-2 mx-auto"
          >
            <Play className="h-6 w-6" />
            <span>START MISSION</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Game Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="relative">
              <Shield className="h-12 w-12 text-blue-600" />
              <Zap className="h-5 w-5 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Cyber Defender</h1>
          </div>
          
          {/* Progress Bar */}
          <div className="bg-white rounded-full h-3 mb-6 shadow-inner">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          
          {/* Stats */}
          <div className="flex justify-center items-center space-x-8 mb-6">
            <div className="bg-white rounded-lg px-6 py-3 shadow-md transform hover:scale-105 transition-transform">
              <div className="text-sm text-gray-500">Mission</div>
              <div className="text-xl font-bold text-blue-600">
                {currentScenario + 1} / {scenarios.length}
              </div>
            </div>
            <div className="bg-white rounded-lg px-6 py-3 shadow-md transform hover:scale-105 transition-transform">
              <div className="text-sm text-gray-500">Score</div>
              <div className="text-xl font-bold text-green-600">{score}</div>
            </div>
            <div className="bg-white rounded-lg px-6 py-3 shadow-md transform hover:scale-105 transition-transform">
              <div className="text-sm text-gray-500">Difficulty</div>
              <div className="text-xl font-bold text-purple-600">{currentScenarioData.difficulty}</div>
            </div>
          </div>
        </div>

        {/* Mission Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 transform hover:scale-[1.02] transition-transform duration-300">
          {/* Mission Header */}
          <div className="flex items-center space-x-4 mb-6">
            <div className={`p-3 rounded-full ${
              currentScenarioData.type === "Phishing Email" ? "bg-red-100" :
              currentScenarioData.type === "Fake OTP Call" ? "bg-orange-100" :
              currentScenarioData.type === "UPI Scam" ? "bg-purple-100" :
              currentScenarioData.type === "Social Media Scam" ? "bg-green-100" :
              "bg-indigo-100"
            }`}>
              <AlertTriangle className={`h-8 w-8 ${
                currentScenarioData.type === "Phishing Email" ? "text-red-600" :
                currentScenarioData.type === "Fake OTP Call" ? "text-orange-600" :
                currentScenarioData.type === "UPI Scam" ? "text-purple-600" :
                currentScenarioData.type === "Social Media Scam" ? "text-green-600" :
                "text-indigo-600"
              }`} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{currentScenarioData.title}</h2>
              <p className="text-gray-600">{currentScenarioData.description}</p>
            </div>
          </div>

          {/* Mission Content */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6 border-l-4 border-blue-500">
            {currentScenarioData.type === "Phishing Email" && (
              <div className="space-y-3">
                <div className="text-sm text-gray-500">📧 From: {currentScenarioData.content.from}</div>
                <div className="text-sm text-gray-500">📋 Subject: {currentScenarioData.content.subject}</div>
                <div className="bg-white p-4 rounded border text-gray-700 whitespace-pre-line font-mono text-sm">
                  {currentScenarioData.content.body}
                </div>
              </div>
            )}
            
            {currentScenarioData.type === "Fake OTP Call" && (
              <div className="space-y-3">
                <div className="text-sm text-gray-500">📞 Caller: {currentScenarioData.content.caller}</div>
                <div className="bg-white p-4 rounded border text-gray-700">
                  {currentScenarioData.content.message}
                </div>
              </div>
            )}
            
            {currentScenarioData.type === "UPI Scam" && (
              <div className="space-y-3">
                <div className="text-sm text-gray-500">📞 Caller: {currentScenarioData.content.caller}</div>
                <div className="bg-white p-4 rounded border text-gray-700">
                  {currentScenarioData.content.message}
                </div>
              </div>
            )}

            {currentScenarioData.type === "Social Media Scam" && (
              <div className="space-y-3">
                <div className="text-sm text-gray-500">📱 Platform: {currentScenarioData.content.platform}</div>
                <div className="text-sm text-gray-500">👤 From: {currentScenarioData.content.sender}</div>
                <div className="bg-white p-4 rounded border text-gray-700">
                  {currentScenarioData.content.message}
                </div>
              </div>
            )}

            {currentScenarioData.type === "Fake Job Offer" && (
              <div className="space-y-3">
                <div className="text-sm text-gray-500">📧 From: {currentScenarioData.content.from}</div>
                <div className="text-sm text-gray-500">📋 Subject: {currentScenarioData.content.subject}</div>
                <div className="bg-white p-4 rounded border text-gray-700 whitespace-pre-line font-mono text-sm">
                  {currentScenarioData.content.body}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {!showFeedback && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ What's your move, Defender?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentScenarioData.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleChoice(option)}
                    disabled={isAnimating}
                    className={`w-full text-left p-4 border-2 rounded-lg transition-all duration-200 transform hover:scale-105 ${
                      isAnimating 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <span className="font-medium">{option.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Feedback */}
          {showFeedback && (
            <div className="space-y-6 animate-fadeIn">
              <div className={`p-6 rounded-lg border-2 ${
                userChoice.isCorrect 
                  ? "bg-green-50 border-green-200 animate-pulse" 
                  : "bg-red-50 border-red-200 animate-pulse"
              }`}>
                <div className="flex items-center space-x-3 mb-3">
                  {userChoice.isCorrect ? (
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  ) : (
                    <XCircle className="h-8 w-8 text-red-600" />
                  )}
                  <span className={`text-xl font-bold ${
                    userChoice.isCorrect ? "text-green-800" : "text-red-800"
                  }`}>
                    {userChoice.isCorrect ? "🎉 MISSION ACCOMPLISHED!" : "💥 MISSION FAILED!"}
                  </span>
                </div>
                <p className={`text-lg ${
                  userChoice.isCorrect ? "text-green-700" : "text-red-700"
                }`}>
                  {userChoice.isCorrect ? currentScenarioData.feedback.correct : currentScenarioData.feedback.incorrect}
                </p>
              </div>

              {/* Learning Points */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                <h4 className="font-bold text-blue-900 mb-4 text-lg">🎓 Mission Debrief:</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {currentScenarioData.learningPoints.map((point, index) => (
                    <div key={index} className="flex items-start space-x-2 text-blue-800">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between">
                <button
                  onClick={resetSimulator}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Restart Game</span>
                </button>
                
                {currentScenario < scenarios.length - 1 ? (
                  <button
                    onClick={nextScenario}
                    className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
                  >
                    <span>Next Mission</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <div className="flex items-center space-x-2 text-green-600">
                    <Trophy className="h-8 w-8" />
                    <span className="font-bold text-xl">🎊 GAME COMPLETE!</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Quick Tips */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">💡 Pro Tips:</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <strong>🎯 For Emails:</strong>
              <ul className="mt-1 space-y-1">
                <li>• Check sender's email address carefully</li>
                <li>• Look for urgent or threatening language</li>
                <li>• Never click suspicious links</li>
              </ul>
            </div>
            <div>
              <strong>📞 For Calls:</strong>
              <ul className="mt-1 space-y-1">
                <li>• Banks never ask for OTP over phone</li>
                <li>• Verify caller identity independently</li>
                <li>• Use official numbers to call back</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatSimulator;
