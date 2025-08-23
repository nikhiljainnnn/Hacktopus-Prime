const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Simple rate limiting
const requestCounts = new Map();
const RATE_LIMIT = 10; // requests per minute
const RATE_WINDOW = 60 * 1000; // 1 minute in milliseconds

const rateLimiterMiddleware = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  
  if (!requestCounts.has(ip)) {
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
  } else {
    const userData = requestCounts.get(ip);
    
    if (now > userData.resetTime) {
      // Reset window
      userData.count = 1;
      userData.resetTime = now + RATE_WINDOW;
    } else if (userData.count >= RATE_LIMIT) {
      return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    } else {
      userData.count++;
    }
  }
  
  next();
};

// Enhanced conversation function
function getSmartResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase().trim();
  
  // Comprehensive conversation responses
  const responses = {
    // Cyber security topics
    'phishing': 'Phishing is a cyber attack where attackers pretend to be trustworthy entities to steal sensitive information. They often send fake emails or messages that look legitimate. Never click suspicious links, don\'t share personal details, and always verify the sender\'s identity through other means. If you receive a suspicious email, report it and delete it immediately.',
    
    'malware': 'Malware is malicious software designed to harm your device or steal data. Common types include viruses, ransomware, and spyware. To protect yourself: keep your software updated, use reliable antivirus software, avoid downloading files from untrusted sources, and be careful about clicking links. Regular scans and updates are your best defense.',
    
    'password': 'Strong passwords are your first line of defense. Use at least 12 characters with a mix of uppercase, lowercase, numbers, and symbols. Never reuse passwords across accounts. Consider using a password manager to generate and store unique passwords securely. Enable two-factor authentication whenever possible for extra security.',
    
    'vpn': 'A VPN (Virtual Private Network) encrypts your internet connection, protecting your privacy and data from hackers and surveillance. It creates a secure tunnel between your device and the internet. Use VPNs on public WiFi networks, when traveling, or when you want to protect your online privacy. Choose a reputable VPN service with strong encryption.',
    
    'social media': 'Be careful what you share on social media. Avoid posting personal information like your address, phone number, or financial details. Check your privacy settings regularly and limit who can see your posts. Be cautious about friend requests from strangers and think twice before sharing location information.',
    
    'online shopping': 'Only shop on secure websites (look for HTTPS and a padlock icon in the address bar). Use credit cards instead of debit cards for online purchases, as they offer better fraud protection. Avoid making purchases on public WiFi networks. Check seller reviews and be suspicious of deals that seem too good to be true.',
    
    'public wifi': 'Public WiFi networks are often unsecured and can expose your data to hackers. Avoid accessing sensitive accounts, making financial transactions, or entering passwords on public networks. If you must use public WiFi, use a VPN to encrypt your connection. Consider using your phone\'s mobile hotspot instead.',
    
    'backup': 'Regularly backup your important data to external drives or cloud storage. This protects you from ransomware attacks, hardware failures, and accidental deletions. Use the 3-2-1 rule: 3 copies, 2 different storage types, 1 offsite location. Test your backups regularly to ensure they work properly.',
    
    'update': 'Keep your operating system, apps, and software updated. Updates often contain security patches that protect against new threats and vulnerabilities. Enable automatic updates when possible, and restart your device when prompted. Outdated software is one of the biggest security risks.',
    
    'suspicious email': 'If an email seems suspicious, don\'t click links or download attachments. Look for red flags like urgent requests for money, poor grammar, unknown senders, or requests for personal information. Verify the sender\'s identity through other means. When in doubt, delete the email and report it as spam.',
    
    'otp': 'OTP (One-Time Password) should never be shared with anyone. Banks and legitimate services will never ask for your OTP over phone or email. If someone asks for your OTP, it\'s likely a scam. OTPs are time-sensitive and expire quickly, so never share them with anyone claiming to be from customer service.',
    
    'spam': 'Spam calls and messages are often attempts to scam you. Never share personal information, financial details, or OTP codes with unknown callers. Block and report suspicious numbers. Be especially careful with calls claiming to be from government agencies, banks, or tech support. When in doubt, hang up and call the official number.',
    
    'scam': 'Scams come in many forms - calls, emails, texts, or social media. Common red flags include urgent requests for money, requests for personal information, threats of legal action, or promises of easy money. Always verify the sender\'s identity through other means. Remember: if it sounds too good to be true, it probably is.',
    
    'hack': 'To protect against hacking, use strong passwords, enable two-factor authentication, keep software updated, and be careful about what you download or click online. Use a firewall, install antivirus software, and monitor your accounts for suspicious activity. Be especially careful with public WiFi and unknown websites.',
    
    'virus': 'Viruses are malicious programs that can harm your device. Use reliable antivirus software, keep your system updated, and avoid downloading files from untrusted sources. Be careful about clicking links in emails or messages. If you suspect a virus, run a full system scan and consider professional help.',
    
    'antivirus': 'Antivirus software helps protect your device from malware. Choose a reputable brand, keep it updated, and run regular scans to maintain security. Free antivirus can be effective, but paid versions often offer better protection and additional features. Don\'t run multiple antivirus programs simultaneously.',
    
    'firewall': 'A firewall acts as a barrier between your device and the internet, blocking unauthorized access. Enable your device\'s built-in firewall and consider additional network protection. Firewalls can be hardware-based (router) or software-based (on your device). They\'re essential for network security.',
    
    'encryption': 'Encryption protects your data by converting it into unreadable code. Use encrypted messaging apps, enable device encryption, and look for HTTPS when browsing websites. Encryption ensures that even if someone intercepts your data, they can\'t read it without the proper key.',
    
    'privacy': 'Protect your privacy by using strong passwords, enabling two-factor authentication, being careful about what you share online, and using privacy-focused browsers and apps. Review your privacy settings regularly, limit location sharing, and be mindful of what you post on social media.',
    
    'data breach': 'If you suspect a data breach, immediately change your passwords, enable two-factor authentication, monitor your accounts for suspicious activity, and consider freezing your credit. Contact affected services and report any unauthorized transactions. Stay alert for phishing attempts related to the breach.',
    
    'identity theft': 'To prevent identity theft, use strong passwords, enable two-factor authentication, monitor your credit reports, and never share personal information with unknown sources. Shred sensitive documents, be careful with your Social Security number, and monitor your accounts regularly for suspicious activity.',
    
    'cyberbullying': 'Cyberbullying involves using technology to harass or intimidate others. If you experience it, block the person, save evidence, report it to platforms, and seek support from trusted adults. Don\'t respond to bullies, and remember that you have the right to feel safe online.',
    
    'social engineering': 'Social engineering manipulates people into revealing sensitive information. Be suspicious of urgent requests, verify identities through other means, and never share passwords or personal details. Attackers often pose as trusted individuals or create fake emergencies to pressure you.',
    
    // Greetings and general conversation
    'hello': 'Hello! I\'m CyberShield AI, your cyber security assistant. I\'m here to help you stay safe online and answer all your cyber security questions. What would you like to learn about today?',
    
    'hi': 'Hi there! I\'m CyberShield AI, your cyber security expert. I can help you with topics like phishing, malware, passwords, VPN, social media safety, and much more. How can I assist you today?',
    
    'hey': 'Hey! I\'m here to help you with all things cyber security. Whether you have questions about staying safe online, protecting your devices, or understanding threats, I\'ve got you covered. What would you like to know?',
    
    'how are you': 'I\'m doing great, thank you for asking! I\'m excited to help you with cyber security today. I\'m here to make staying safe online easier and more understandable. What cyber security topic would you like to discuss?',
    
    'how are you doing': 'I\'m doing fantastic! I\'m ready to help you with all your cyber security questions and concerns. My goal is to make cyber security simple and accessible for everyone. What would you like to learn about staying safe online?',
    
    'good morning': 'Good morning! I\'m here to help you start your day safely online. Cyber security is important 24/7, and I\'m ready to answer any questions you have about protecting yourself, your devices, and your data. What\'s on your mind?',
    
    'good afternoon': 'Good afternoon! I\'m here to help you stay safe online throughout your day. Whether you\'re working, shopping, or just browsing, I can help you understand the risks and how to protect yourself. What cyber security questions do you have?',
    
    'good evening': 'Good evening! I\'m here to help you with cyber security questions as you wind down your day. It\'s never too late to learn about staying safe online. What would you like to know about protecting yourself in the digital world?',
    
    'thanks': 'You\'re very welcome! I\'m glad I could help you stay safe online. Remember, cyber security is an ongoing journey, and I\'m here whenever you have more questions. Stay vigilant and feel free to ask anything else!',
    
    'thank you': 'You\'re absolutely welcome! It\'s my pleasure to help you understand cyber security better. Knowledge is your best defense against online threats. Don\'t hesitate to ask more questions - I\'m here to help you stay safe!',
    
    'bye': 'Goodbye! Thank you for taking the time to learn about cyber security. Remember to stay vigilant online and practice the safety tips we discussed. I\'ll be here whenever you need help again. Stay safe!',
    
    'goodbye': 'Goodbye! It\'s been great helping you with cyber security today. Keep practicing good online habits and remember that staying safe online is a continuous effort. Feel free to return anytime with more questions. Take care!',
    
    // Help and guidance
    'help': 'I can help you with many cyber security topics! Here are some areas I cover: phishing, malware, passwords, VPN, social media safety, online shopping, public WiFi, backups, updates, suspicious emails, OTP security, spam calls, scams, hacking, viruses, antivirus, firewall, encryption, privacy, data breaches, identity theft, cyberbullying, and social engineering. What interests you most?',
    
    'what can you do': 'I\'m your comprehensive cyber security assistant! I can explain threats like phishing and malware, teach you about protection methods like VPNs and firewalls, help you understand privacy and encryption, guide you through safe online practices, and answer questions about scams, identity theft, and more. I\'m here to make cyber security simple and accessible. What would you like to learn about?',
    
    'what do you know': 'I have extensive knowledge about cyber security! I can help with: understanding threats (phishing, malware, scams), protection methods (passwords, VPNs, firewalls, antivirus), safe practices (social media, online shopping, public WiFi), privacy and encryption, incident response (data breaches, identity theft), and much more. I\'m designed to make complex security concepts easy to understand. What topic interests you?',
    
    // General conversation
    'what is your name': 'My name is CyberShield AI! I\'m your dedicated cyber security assistant, designed to help you understand and navigate the digital world safely. I\'m here to answer your questions, explain security concepts, and guide you toward better online safety practices.',
    
    'who are you': 'I\'m CyberShield AI, your cyber security expert and digital safety companion. I was created to help people understand cyber security in simple terms and provide practical advice for staying safe online. Think of me as your personal security advisor!',
    
    'what is cyber security': 'Cyber security is the practice of protecting computers, servers, mobile devices, electronic systems, networks, and data from digital attacks, theft, and damage. It includes everything from using strong passwords and antivirus software to understanding threats like phishing and malware. The goal is to keep your digital life safe and secure.',
    
    'why is cyber security important': 'Cyber security is crucial because we rely on technology for almost everything - banking, shopping, communication, work, and entertainment. Without proper protection, you could lose money, have your identity stolen, lose important data, or have your privacy violated. Good cyber security practices help prevent these problems and give you peace of mind.',
    
    'how can i stay safe online': 'Great question! Here are the key steps: 1) Use strong, unique passwords for each account, 2) Enable two-factor authentication, 3) Keep your software updated, 4) Be careful about what you click and download, 5) Use antivirus software, 6) Be cautious on public WiFi, 7) Think before sharing personal information online, 8) Regularly backup your data. Would you like me to explain any of these in detail?',
    
    'tell me a joke': 'Why did the computer go to the doctor? Because it had a virus! 😄 But seriously, while I love a good tech joke, I\'m primarily here to help you with cyber security. Is there a specific security topic you\'d like to learn about?',
    
    'are you real': 'I\'m a real AI assistant, but I\'m not a human. I\'m designed specifically to help you with cyber security questions and provide accurate, helpful information about staying safe online. While I can\'t browse the web or access real-time information, I have extensive knowledge about cyber security best practices and can help you understand how to protect yourself digitally.',
    
    'how do you work': 'I work by analyzing your questions and providing relevant, accurate information about cyber security. I\'ve been trained on comprehensive security topics and can help explain complex concepts in simple terms. I don\'t need internet access or external APIs - I work entirely offline to give you fast, reliable answers about staying safe online.',
    
    'what makes you special': 'What makes me special is my focus on cyber security and my ability to explain complex security concepts in simple, understandable terms. I\'m designed to be your personal security advisor, helping you navigate the digital world safely. I provide practical, actionable advice rather than just technical jargon, making cyber security accessible to everyone.',
    
    'can you teach me': 'Absolutely! I love teaching people about cyber security. I can explain concepts step by step, provide practical examples, and help you understand both the threats and the solutions. Whether you\'re a beginner or have some knowledge, I can adapt my explanations to your level. What would you like to learn about first?',
    
    'i want to learn': 'That\'s fantastic! I\'m excited to help you learn about cyber security. We can start with the basics like understanding common threats, or jump into specific topics that interest you. Some good starting points are: what is phishing, how to create strong passwords, or how to stay safe on social media. What sounds most interesting to you?',
    
    'i am scared': 'It\'s completely normal to feel concerned about cyber security - the digital world can seem overwhelming! But remember, knowledge is power. The more you understand about threats and protection, the safer you\'ll feel. I\'m here to help you learn at your own pace, and we\'ll focus on practical steps you can take right now. What\'s your biggest concern? Let\'s tackle it together.',
    
    'i feel overwhelmed': 'I completely understand that feeling! Cyber security can seem like a lot to take in, but you don\'t have to learn everything at once. Let\'s start with the basics and build from there. We can focus on one topic at a time, and I\'ll break things down into simple, manageable steps. What\'s one thing you\'d like to understand better? We\'ll take it step by step.',
    
    'what should i do first': 'Great question! Let\'s start with the most impactful steps: 1) Create strong, unique passwords for your important accounts (email, banking, social media), 2) Enable two-factor authentication on these accounts, 3) Update your devices and apps to the latest versions. These three steps will significantly improve your security. Which one would you like me to help you with first?',
    
    'is this safe': 'That\'s a smart question to ask! Without knowing the specific situation, I can\'t give you a definitive answer, but I can help you evaluate it. Generally, if something feels suspicious, urgent, or too good to be true, it\'s worth being cautious. Can you tell me more about what you\'re asking about? I\'ll help you assess the risks and make an informed decision.',
    
    'should i worry': 'While it\'s good to be aware of cyber security risks, you don\'t need to worry constantly. The key is to take reasonable precautions and develop good habits. Think of it like locking your doors - you do it automatically without stressing about it. I\'m here to help you build those good habits so you can feel confident and safe online. What\'s your main concern?'
  };
  
  // First, try exact matches for greetings and common phrases
  if (responses[lowerMessage]) {
    return responses[lowerMessage];
  }
  
  // Then try partial matches for cyber security topics
  for (const [key, response] of Object.entries(responses)) {
    if (lowerMessage.includes(key) && key.length > 2) {
      return response;
    }
  }
  
  // Default response for unmatched queries
  return "I understand you're asking about cyber security, but I'm not sure about that specific topic. I can help you with: phishing, malware, passwords, VPN, social media safety, online shopping, public WiFi, backups, updates, suspicious emails, OTP security, spam calls, scams, hacking, viruses, antivirus, firewall, encryption, privacy, data breaches, identity theft, cyberbullying, and social engineering. What would you like to learn about?";
}

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'CyberShield Backend API is running!' });
});

// Chatbot API endpoint
app.post('/api/chat', rateLimiterMiddleware, async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Enhanced conversation responses without external API
    const response = getSmartResponse(message);
    res.json({ 
      success: true, 
      response: response,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chatbot API Error:', error);
    
    // Fallback responses for common cyber security questions
    const fallbackResponses = {
      // Cyber security topics
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
      'spam': 'Spam calls and messages are often attempts to scam you. Never share personal information, financial details, or OTP codes with unknown callers. Block and report suspicious numbers.',
      'spam call': 'Spam calls and messages are often attempts to scam you. Never share personal information, financial details, or OTP codes with unknown callers. Block and report suspicious numbers.',
      'spam calls': 'Spam calls and messages are often attempts to scam you. Never share personal information, financial details, or OTP codes with unknown callers. Block and report suspicious numbers.',
      'scam': 'Scams come in many forms - calls, emails, texts, or social media. Always verify the sender\'s identity, never share personal information, and be suspicious of urgent requests for money or data.',
      'hack': 'To protect against hacking, use strong passwords, enable two-factor authentication, keep software updated, and be careful about what you download or click online.',
      'hacking': 'To protect against hacking, use strong passwords, enable two-factor authentication, keep software updated, and be careful about what you download or click online.',
      'virus': 'Viruses are malicious programs that can harm your device. Use reliable antivirus software, keep your system updated, and avoid downloading files from untrusted sources.',
      'antivirus': 'Antivirus software helps protect your device from malware. Choose a reputable brand, keep it updated, and run regular scans to maintain security.',
      'firewall': 'A firewall acts as a barrier between your device and the internet, blocking unauthorized access. Enable your device\'s built-in firewall and consider additional network protection.',
      'encryption': 'Encryption protects your data by converting it into unreadable code. Use encrypted messaging apps, enable device encryption, and look for HTTPS when browsing websites.',
      'privacy': 'Protect your privacy by using strong passwords, enabling two-factor authentication, being careful about what you share online, and using privacy-focused browsers and apps.',
      'data breach': 'If you suspect a data breach, immediately change your passwords, enable two-factor authentication, monitor your accounts for suspicious activity, and consider freezing your credit.',
      'identity theft': 'To prevent identity theft, use strong passwords, enable two-factor authentication, monitor your credit reports, and never share personal information with unknown sources.',
      'cyberbullying': 'Cyberbullying involves using technology to harass or intimidate others. If you experience it, block the person, save evidence, report it to platforms, and seek support from trusted adults.',
      'social engineering': 'Social engineering manipulates people into revealing sensitive information. Be suspicious of urgent requests, verify identities through other means, and never share passwords or personal details.',
      
      // Greetings and general conversation
      'hello': 'Hello! I\'m here to help you stay safe online. What would you like to know about cyber security?',
      'hi': 'Hi there! I\'m CyberShield AI, your cyber security assistant. How can I help you today?',
      'hey': 'Hey! I\'m here to help you with cyber security questions. What would you like to learn about?',
      'how are you': 'I\'m doing well, thank you! I\'m here to help you stay safe online. What cyber security topic would you like to discuss?',
      'how are you doing': 'I\'m doing great! Ready to help you with cyber security questions. What would you like to know about staying safe online?',
      'good morning': 'Good morning! I\'m here to help you start your day safely online. What cyber security questions do you have?',
      'good afternoon': 'Good afternoon! I\'m here to help you stay safe online. What would you like to know about cyber security?',
      'good evening': 'Good evening! I\'m here to help you with cyber security questions. What topic would you like to discuss?',
      'thanks': 'You\'re welcome! Stay safe online and feel free to ask if you have more questions.',
      'thank you': 'You\'re welcome! Stay safe online and feel free to ask if you have more questions.',
      'bye': 'Goodbye! Remember to stay vigilant online. Feel free to return if you have more questions!',
      'goodbye': 'Goodbye! Remember to stay vigilant online. Feel free to return if you have more questions!',
      
      // Help and guidance
      'help': 'I can help you with: phishing, malware, passwords, VPN, social media safety, online shopping, public WiFi, backups, updates, suspicious emails, OTP security, spam calls, scams, hacking, viruses, antivirus, firewall, encryption, privacy, data breaches, identity theft, cyberbullying, and social engineering. What would you like to learn about?',
      'what can you do': 'I can help you with cyber security topics like phishing, malware, passwords, VPN, social media safety, online shopping, public WiFi, backups, updates, suspicious emails, OTP security, spam calls, scams, hacking, viruses, antivirus, firewall, encryption, privacy, data breaches, identity theft, cyberbullying, and social engineering. What interests you?',
      'what do you know': 'I know about cyber security topics including phishing, malware, passwords, VPN, social media safety, online shopping, public WiFi, backups, updates, suspicious emails, OTP security, spam calls, scams, hacking, viruses, antivirus, firewall, encryption, privacy, data breaches, identity theft, cyberbullying, and social engineering. What would you like to learn about?'
    };

    // Check for fallback matches with improved logic
    const lowerMessage = req.body.message.toLowerCase();
    let fallbackResponse = "I'm having trouble connecting to my AI service right now. I can help you with common cyber security topics like phishing, malware, passwords, VPN, social media safety, online shopping, and more. Try asking about one of these topics!";
    
    // First, try exact matches for greetings and common phrases
    if (fallbackResponses[lowerMessage]) {
      fallbackResponse = fallbackResponses[lowerMessage];
    } else {
      // Then try partial matches for cyber security topics
      for (const [key, response] of Object.entries(fallbackResponses)) {
        if (lowerMessage.includes(key) && key.length > 2) { // Only match keys longer than 2 characters
          fallbackResponse = response;
          break;
        }
      }
    }

    res.json({ 
      success: true, 
      response: fallbackResponse,
      timestamp: new Date().toISOString(),
      fallback: true
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 CyberShield Backend running on port ${PORT}`);
  console.log(`📱 Chatbot API available at http://localhost:${PORT}/api/chat`);
  console.log(`🏥 Health check at http://localhost:${PORT}/api/health`);
});

module.exports = app;
