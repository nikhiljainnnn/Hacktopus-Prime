# CyberShield Backend

Backend server for CyberShield chatbot and API services.

## 🚀 Features

- **Express.js server** with security middleware
- **Chatbot API** with Gemini AI integration
- **Rate limiting** to prevent abuse
- **CORS configuration** for frontend integration
- **Fallback responses** when AI service is unavailable
- **Health check endpoints** for monitoring

## 📁 Project Structure

```
backend/
├── server.js          # Main server file
├── package.json       # Dependencies and scripts
├── .env              # Environment variables (create this)
└── README.md         # This file
```

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Create Environment File

Create a `.env` file in the backend folder:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL for CORS
FRONTEND_URL=http://localhost:3000

# Gemini API Configuration
GEMINI_API_KEY=your_actual_gemini_api_key_here

# Security
RATE_LIMIT_POINTS=10
RATE_LIMIT_DURATION=60
```

### 3. Get Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key to your `.env` file

### 4. Start the Server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

## 🌐 API Endpoints

### Chatbot API
- **POST** `/api/chat` - Send message to chatbot
- **Body:** `{ "message": "your question here" }`
- **Response:** `{ "success": true, "response": "AI response", "timestamp": "..." }`

### Health Check
- **GET** `/api/health` - Server health status
- **Response:** `{ "status": "healthy", "timestamp": "...", "uptime": 123 }`

### Root
- **GET** `/` - Server status
- **Response:** `{ "message": "CyberShield Backend API is running!" }`

## 🔒 Security Features

- **Helmet.js** for security headers
- **CORS protection** with configurable origins
- **Rate limiting** (10 requests per minute per IP)
- **Request size limits** (10MB max)
- **Input validation** and sanitization

## 🔧 Configuration Options

### Rate Limiting
- **Points:** Number of requests allowed per duration
- **Duration:** Time window in seconds
- **Default:** 10 requests per 60 seconds

### CORS
- **Origin:** Frontend URL (default: http://localhost:3000)
- **Credentials:** Enabled for secure communication

## 🚨 Error Handling

The server includes comprehensive error handling:
- **400 Bad Request** - Invalid input
- **429 Too Many Requests** - Rate limit exceeded
- **500 Internal Server Error** - Server issues
- **404 Not Found** - Invalid endpoints

## 📱 Frontend Integration

The frontend Chatbot component automatically connects to:
- **Default:** `http://localhost:5000/api/chat`
- **Configurable:** Set `VITE_BACKEND_URL` in frontend `.env`

## 🧪 Testing

Test the API endpoints:

```bash
# Test chatbot
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is phishing?"}'

# Test health check
curl http://localhost:5000/api/health
```

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   - Change PORT in `.env` file
   - Kill process using the port

2. **CORS errors**
   - Check FRONTEND_URL in `.env`
   - Ensure frontend is running on correct port

3. **Gemini API errors**
   - Verify API key is correct
   - Check API key permissions
   - Ensure internet connection

4. **Rate limiting**
   - Wait for rate limit to reset
   - Increase limits in configuration if needed

## 📊 Monitoring

Monitor server health:
- **Health endpoint:** `/api/health`
- **Console logs** for debugging
- **Error tracking** in console

## 🔄 Updates

To update dependencies:
```bash
npm update
npm audit fix
```

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Review console logs
3. Verify environment configuration
4. Test API endpoints manually
