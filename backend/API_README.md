# Dashboard API Documentation

This document explains how to set up and use the real-time dashboard API for the Hacktopus Prime cyber safety platform.

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Configuration
Create a `.env` file in the backend directory with the following variables:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
PORT=5000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 3. Seed Sample Data
```bash
npm run seed
```
This will populate the database with realistic cyber attack data for testing.

### 4. Start the Server
```bash
npm run dev
```
The API will be available at `http://localhost:5000`

## 📊 API Endpoints

### Authentication Required
All dashboard endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### 1. Dashboard Statistics
**GET** `/api/dashboard/stats`

Get overall dashboard statistics including attack counts, resolution rates, and user metrics.

**Query Parameters:**
- `timeframe` (optional): `7d`, `30d`, `90d`, `1y` (default: `30d`)

**Response:**
```json
{
  "success": true,
  "data": {
    "attacks": {
      "total": 1250,
      "resolved": 875,
      "resolutionRate": 70.0,
      "recent24h": 15,
      "totalLoss": 2500000,
      "avgLoss": 2000
    },
    "users": {
      "total": 5000,
      "active": 1200,
      "activeRate": 24
    },
    "quizzes": {
      "totalAttempts": 3500,
      "avgScore": 75
    }
  }
}
```

### 2. Attacks by Type
**GET** `/api/dashboard/attacks-by-type`

Get distribution of attacks by type (phishing, UPI scams, etc.).

**Query Parameters:**
- `timeframe` (optional): `7d`, `30d`, `90d`, `1y` (default: `30d`)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "phishing",
      "count": 450,
      "totalLoss": 900000,
      "avgLoss": 2000
    },
    {
      "_id": "upi_scam",
      "count": 300,
      "totalLoss": 600000,
      "avgLoss": 2000
    }
  ]
}
```

### 3. Attacks by Demographic
**GET** `/api/dashboard/attacks-by-demographic`

Get distribution of attacks by demographic groups.

**Query Parameters:**
- `timeframe` (optional): `7d`, `30d`, `90d`, `1y` (default: `30d`)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "professional",
      "count": 400,
      "totalLoss": 800000,
      "avgLoss": 2000
    },
    {
      "_id": "student",
      "count": 250,
      "totalLoss": 500000,
      "avgLoss": 2000
    }
  ]
}
```

### 4. Monthly Trends
**GET** `/api/dashboard/monthly-trends`

Get monthly attack trends over the last 12 months.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "month": "2024-01",
      "attacks": 120,
      "loss": 240000
    },
    {
      "month": "2024-02",
      "attacks": 135,
      "loss": 270000
    }
  ]
}
```

### 5. Attacks by Age Group
**GET** `/api/dashboard/attacks-by-age`

Get distribution of attacks by age groups.

**Query Parameters:**
- `timeframe` (optional): `7d`, `30d`, `90d`, `1y` (default: `30d`)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "26-35",
      "count": 350,
      "totalLoss": 700000
    },
    {
      "_id": "18-25",
      "count": 280,
      "totalLoss": 560000
    }
  ]
}
```

### 6. Top Affected States
**GET** `/api/dashboard/top-states`

Get top states with highest attack counts.

**Query Parameters:**
- `timeframe` (optional): `7d`, `30d`, `90d`, `1y` (default: `30d`)
- `limit` (optional): Number of states to return (default: 10)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "Maharashtra",
      "count": 180,
      "totalLoss": 360000
    },
    {
      "_id": "Karnataka",
      "count": 150,
      "totalLoss": 300000
    }
  ]
}
```

### 7. Recent Attacks
**GET** `/api/dashboard/recent-attacks`

Get recent cyber attack reports.

**Query Parameters:**
- `limit` (optional): Number of attacks to return (default: 10)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "type": "phishing",
      "severity": "high",
      "demographic": "student",
      "state": "Maharashtra",
      "city": "Mumbai",
      "ageGroup": "18-25",
      "financialLoss": 25000,
      "isResolved": false,
      "description": "Fake scholarship email claiming to offer financial aid",
      "attackVector": "email",
      "timestamp": "2024-01-15T10:30:00.000Z",
      "reportedBy": {
        "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com"
      }
    }
  ]
}
```

### 8. Severity Distribution
**GET** `/api/dashboard/severity-distribution`

Get distribution of attacks by severity level.

**Query Parameters:**
- `timeframe` (optional): `7d`, `30d`, `90d`, `1y` (default: `30d`)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "high",
      "count": 400,
      "totalLoss": 800000
    },
    {
      "_id": "medium",
      "count": 300,
      "totalLoss": 600000
    }
  ]
}
```

### 9. User Engagement
**GET** `/api/dashboard/user-engagement`

Get user engagement metrics.

**Query Parameters:**
- `timeframe` (optional): `7d`, `30d`, `90d`, `1y` (default: `30d`)

**Response:**
```json
{
  "success": true,
  "data": {
    "quizAttempts": 3500,
    "uniqueQuizUsers": 1200,
    "newUsers": 500,
    "activeUsers": 800
  }
}
```

## 🗄️ Database Schema

### CyberAttack Model
```javascript
{
  type: String, // phishing, upi_scam, social_media_fraud, identity_theft, ransomware, data_breach, malware, vishing
  severity: String, // low, medium, high, critical
  demographic: String, // student, professional, homemaker, rural_user, senior_citizen, business_owner
  state: String,
  city: String,
  ageGroup: String, // 18-25, 26-35, 36-45, 46-55, 56-65, 65+
  financialLoss: Number,
  isResolved: Boolean,
  reportedBy: ObjectId, // Reference to User
  description: String,
  attackVector: String, // email, sms, phone_call, social_media, website, app, public_wifi, other
  timestamp: Date,
  resolvedAt: Date,
  tags: [String]
}
```

## 🔧 Development

### Adding New Endpoints
1. Create new route in `routes/dashboard.js`
2. Add authentication middleware: `auth`
3. Use MongoDB aggregation for complex queries
4. Follow the response format: `{ success: true, data: ... }`

### Performance Optimization
- Use database indexes for frequently queried fields
- Implement caching for static data
- Use aggregation pipelines for complex calculations
- Limit result sets with pagination

### Error Handling
All endpoints return consistent error responses:
```json
{
  "success": false,
  "message": "Error description"
}
```

## 🚨 Security Features

- JWT authentication for all endpoints
- Rate limiting (100 requests per 15 minutes per IP)
- Input validation and sanitization
- CORS configuration
- Helmet.js security headers
- MongoDB injection protection

## 📈 Real-time Features

The dashboard provides real-time data with:
- Live attack statistics
- Recent attack feed
- User engagement metrics
- Geographic distribution
- Demographic analysis
- Trend analysis

## 🔄 Data Updates

The sample data includes:
- 100+ realistic cyber attack records
- Geographic distribution across India
- Various attack types and severities
- Different demographics and age groups
- Realistic financial losses
- Timestamps spanning 90 days

To update data, run the seeder again:
```bash
npm run seed
```

## 🧪 Testing

Test the API endpoints using tools like:
- Postman
- curl
- Thunder Client (VS Code extension)

Example curl request:
```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -H "Content-Type: application/json" \
     http://localhost:5000/api/dashboard/stats?timeframe=30d
```

## 📞 Support

For issues or questions:
1. Check the server logs for error details
2. Verify MongoDB connection
3. Ensure JWT token is valid
4. Check rate limiting if getting 429 errors
