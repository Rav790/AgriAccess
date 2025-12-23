# 🌾 AgriAssess Dashboard

An interactive, AI-powered agricultural data assessment platform for analyzing land holding patterns, irrigation sources, cropping patterns, and well depths across India.

## 🚀 Features

- **Interactive Dashboards**: Real-time data visualization with filters and custom queries
- **AI-Powered Insights**: Google Gemini AI integration for predictions and summaries
- **Multi-Database Architecture**: PostgreSQL for structured data, MongoDB for flexible data
- **User Authentication**: JWT-based auth with role management (Guest, User, Admin, Researcher)
- **Data Visualization**: Charts (Bar, Pie, Line), Heatmaps, and Geographic Maps
- **Real-time Collaboration**: Socket.io for live data updates
- **Export Capabilities**: Download charts as PNG/PDF, data as CSV
- **Mobile-First Design**: Responsive UI with Tailwind CSS and dark mode support

## 📋 Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Redux Toolkit
- Chart.js & Recharts
- React-Leaflet
- Framer Motion
- Socket.io Client
- Axios

### Backend
- Node.js + Express.js
- PostgreSQL (Sequelize ORM)
- MongoDB (Mongoose ODM)
- JWT + bcrypt
- Google Gemini AI API
- Socket.io
- Nodemailer

## 🛠️ Installation

### Prerequisites
- Node.js (v18+)
- PostgreSQL (v14+)
- MongoDB (v6+)
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   cd agro
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your actual credentials
   ```

4. **Set up databases**
   - Create PostgreSQL database: `agriassess_db`
   - Ensure MongoDB is running on localhost:27017

5. **Seed sample data**
   ```bash
   npm run seed
   ```

6. **Run development servers**
   ```bash
   npm run dev
   ```
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## 📁 Project Structure

```
agriassess-dashboard/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── redux/           # Redux store & slices
│   │   ├── utils/           # API calls & helpers
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── public/              # Static assets
│   ├── tailwind.config.js   # Tailwind configuration
│   └── vite.config.js       # Vite configuration
├── backend/                 # Express backend
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   └── config/          # Configuration files
│   ├── seed.js              # Data seeding script
│   └── server.js            # Server entry point
├── .env.example             # Environment template
└── README.md                # Documentation
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/profile` - Get user profile

### Data Management
- `GET /api/data/regions` - Get all regions
- `GET /api/data/landholdings` - Get land holding data
- `GET /api/data/irrigation` - Get irrigation sources
- `GET /api/data/cropping` - Get cropping patterns
- `GET /api/data/wells` - Get well depth data
- `POST /api/data/upload` - Upload data (Admin only)

### AI Insights
- `POST /api/ai/summary` - Generate data summary
- `POST /api/ai/predict` - Predict trends
- `POST /api/ai/chat` - AI chat interface
- `POST /api/ai/report` - Generate PDF report

### User Management
- `GET /api/users/assessments` - Get saved assessments
- `POST /api/users/save-assessment` - Save assessment
- `DELETE /api/users/assessment/:id` - Delete assessment

## 🎨 UI Components

- **DashboardCard**: Metric display cards
- **ChartWrapper**: Chart container with export
- **AIModal**: AI chat interface
- **FilterPanel**: Advanced filtering
- **MapVisualization**: Geographic heatmaps
- **DataTable**: Sortable data tables

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Input sanitization and validation
- Rate limiting on API endpoints
- CORS protection
- SQL injection prevention
- XSS protection

## 📊 Sample Data

The seed script includes data for 10 Indian states:
- Punjab, Haryana, Uttar Pradesh
- Maharashtra, Gujarat, Rajasthan
- Kerala, Tamil Nadu, Karnataka, West Bengal

## 🌐 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy dist/ folder to Vercel
```

### Backend (Render/Heroku)
```bash
cd backend
# Set environment variables on platform
# Deploy with auto-detection of Node.js
```

## 📝 Usage Examples

### AI Summary Generation
```javascript
// Query for insights
const response = await axios.post('/api/ai/summary', {
  region: 'Punjab',
  dataType: 'irrigation'
});
// Returns AI-generated summary with recommendations
```

### Custom Data Query
```javascript
// Advanced filtering
const data = await axios.get('/api/data/cropping', {
  params: {
    state: 'Punjab',
    crop: 'wheat',
    season: 'rabi',
    minYield: 3.5
  }
});
```

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

MIT License - see LICENSE file for details

## 📧 Support

For questions or support, contact: support@agriassess.com

## 🙏 Acknowledgments

- Data sources: Ministry of Agriculture & Farmers Welfare, India
- Maps: OpenStreetMap contributors
- AI: Google Gemini API
- Icons: Heroicons

---

**Built with ❤️ for Indian Agriculture**
