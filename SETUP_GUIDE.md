# 🚀 AgriAssess Dashboard - Quick Start Guide

This guide will help you set up and run the AgriAssess Dashboard locally.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v14 or higher) - [Download](https://www.postgresql.org/download/)
- **MongoDB** (v6 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/downloads)

## 🔧 Installation Steps

### 1. Install Dependencies

Open PowerShell in the `agro` folder and run:

```powershell
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

cd ..
```

### 2. Set Up Databases

#### PostgreSQL Setup:
```powershell
# Login to PostgreSQL (adjust path if needed)
& 'C:\Program Files\PostgreSQL\14\bin\psql.exe' -U postgres

# In PostgreSQL prompt:
CREATE DATABASE agriassess_db;
\q
```

#### MongoDB Setup:
MongoDB should be running on `mongodb://localhost:27017`

Check if MongoDB is running:
```powershell
mongosh
# If connected successfully, MongoDB is running
exit
```

### 3. Configure Environment Variables

```powershell
# Copy environment template
Copy-Item .env.example .env
```

Edit `.env` file with your actual values:
```env
PORT=5000
NODE_ENV=development

# PostgreSQL
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=your_actual_password
PG_DATABASE=agriassess_db

# MongoDB
MONGO_URI=mongodb://localhost:27017/agriassess

# JWT Secret (generate a random string)
JWT_SECRET=your_super_secret_jwt_key_change_this

# Google Gemini AI API Key
# Get your API key from: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key_here

# Email (optional for now)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### 4. Seed the Database

```powershell
npm run seed
```

This will create sample data for 10 Indian states with agricultural information.

### 5. Start the Application

Open **two separate PowerShell windows**:

**Window 1 - Backend:**
```powershell
cd backend
npm run dev
```

**Window 2 - Frontend:**
```powershell
cd frontend
npm run dev
```

Or use a single command from the root:
```powershell
npm run dev
```

## 🌐 Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## 👤 Demo Login Credentials

After seeding, you can login with:

**Admin Account:**
- Email: `admin@agriassess.com`
- Password: `admin123`

**Researcher Account:**
- Email: `researcher@agriassess.com`
- Password: `researcher123`

**Farmer Account:**
- Email: `farmer@example.com`
- Password: `farmer123`

## 🔑 Getting Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key
5. Add it to your `.env` file as `GEMINI_API_KEY`

## 🐛 Troubleshooting

### PostgreSQL Connection Error:
```powershell
# Check if PostgreSQL is running
Get-Service -Name postgresql*

# Start PostgreSQL if not running
Start-Service postgresql-x64-14  # Adjust version number
```

### MongoDB Connection Error:
```powershell
# Check if MongoDB is running
Get-Service -Name MongoDB

# Start MongoDB if not running
Start-Service MongoDB
```

### Port Already in Use:
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
Stop-Process -Id PID -Force
```

### Module Not Found Errors:
```powershell
# Clear node_modules and reinstall
Remove-Item -Recurse -Force node_modules, backend/node_modules, frontend/node_modules
npm run install:all
```

## 📊 Features to Explore

1. **Dashboard** - View agricultural statistics with interactive charts
2. **AI Insights** - Chat with AI, generate summaries and predictions
3. **Filters** - Select state, district, year, crop, and season
4. **Maps** - Geographic visualization of well depths
5. **Profile** - Manage your account settings

## 🚀 Production Deployment

### Frontend (Vercel):
```powershell
cd frontend
npm run build
# Deploy 'dist' folder to Vercel
```

### Backend (Render/Heroku):
```powershell
cd backend
# Push to Render or Heroku with environment variables
```

## 📝 Notes

- The application uses **mock AI responses** if GEMINI_API_KEY is not set
- Sample data covers 25+ districts across 10 Indian states
- All data is for demonstration purposes
- Dark mode is supported (toggle in navbar)
- Mobile responsive design

## 💡 Next Steps

- Explore different states and years using filters
- Try the AI chat to ask questions about agricultural data
- Generate AI summaries and predictions
- Check out the interactive maps showing well depth patterns
- Export charts and data

## 🆘 Need Help?

If you encounter any issues:
1. Check the console logs in both backend and frontend terminals
2. Verify all services (PostgreSQL, MongoDB) are running
3. Ensure all environment variables are correctly set
4. Check the README.md for detailed documentation

---

**Happy Analyzing! 🌾**
