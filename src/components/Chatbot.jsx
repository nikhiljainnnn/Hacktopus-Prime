import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm CyberShield AI powered by Gemini. I can help you with cyber security questions, threats, and guidance. How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Backend API configuration
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  // Floating animation effect
  useEffect(() => {
    let startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const x = Math.sin(elapsed * 0.001) * 3;
      const y = Math.cos(elapsed * 0.0015) * 2;
      setPosition({ x, y });
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getBotResponse = async (userMessage) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        return data.response;
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Error calling backend API:', error);
      
      // Fallback responses for common cyber security questions
      const fallbackResponses = {
        'phishing': 'Phishing is a cyber attack where attackers pretend to be trustworthy entities to steal sensitive information. Never click suspicious links or share personal details.',
        'malware': 'Malware is malicious software designed to harm your device or steal data. Keep your software updated and use reliable antivirus software.',
        'password': 'Use strong, unique passwords for each account. Consider using a password manager and enable two-factor authentication when possible.',
        'vpn': 'A VPN (Virtual Private Network) encrypts your internet connection, protecting your privacy and data from hackers and surveillance.',
        'social media': 'Be careful what you share on social media. Avoid posting personal information, location details, or financial information publicly.',
        'online shopping': 'Only shop on secure websites (look for HTTPS and padlock icon). Use credit cards instead of debit cards for online purchases.',
        'public wifi': 'Public WiFi networks are often unsecured. Avoid accessing sensitive accounts or making financial transactions on public networks.',
        'backup': 'Regularly backup your important data to external drives or cloud storage. This protects you from ransomware and data loss.',
        'update': 'Keep your operating system, apps, and software updated. Updates often contain security patches that protect against new threats.',
        'suspicious email': 'If an email seems suspicious, don\'t click links or download attachments. Verify the sender\'s identity through other means.',
        'otp': 'OTP (One-Time Password) should never be shared with anyone. Banks and legitimate services will never ask for your OTP.',
        'help': 'I can help you with: phishing, malware, passwords, VPN, social media safety, online shopping, public WiFi, backups, updates, suspicious emails, and OTP security.',
        'hello': 'Hello! I\'m here to help you stay safe online. What would you like to know about cyber security?',
        'hi': 'Hi there! I\'m CyberShield AI, your cyber security assistant. How can I help you today?',
        'thanks': 'You\'re welcome! Stay safe online and feel free to ask if you have more questions.',
        'thank you': 'You\'re welcome! Stay safe online and feel free to ask if you have more questions.',
        'bye': 'Goodbye! Remember to stay vigilant online. Feel free to return if you have more questions!'
      };

      // Check for fallback matches
      const lowerMessage = userMessage.toLowerCase();
      for (const [key, response] of Object.entries(fallbackResponses)) {
        if (lowerMessage.includes(key)) {
          return response;
        }
      }

      return "I'm having trouble connecting to my AI service right now. I can help you with common cyber security topics like phishing, malware, passwords, VPN, social media safety, online shopping, and more. Try asking about one of these topics!";
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const botResponse = await getBotResponse(inputMessage);
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting response:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm sorry, I'm having trouble processing your request right now. Please try again in a moment.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <div 
        className="fixed bottom-6 right-6 z-50 cursor-pointer transition-transform duration-300 hover:scale-110"
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </div>
      </div>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-2xl flex items-center space-x-3">
            <Bot size={20} />
            <span className="font-semibold">CyberShield AI</span>
            <button 
              onClick={() => setIsOpen(false)}
              className="ml-auto hover:bg-blue-700 p-1 rounded-full transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-2xl ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.isBot ? 'text-gray-500' : 'text-blue-100'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about cyber security..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
