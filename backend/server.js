require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const http = require('http');
const socketIo = require('socket.io');
const rateLimit = require('express-rate-limit');

// Database connections
const { sequelize } = require('./src/config/postgres');
const connectMongoDB = require('./src/config/mongodb');

// Routes
const authRoutes = require('./src/routes/authRoutes');
const dataRoutes = require('./src/routes/dataRoutes');
const aiRoutes = require('./src/routes/aiRoutes');
const userRoutes = require('./src/routes/userRoutes');

// Middleware
const errorHandler = require('./src/middleware/errorHandler');

const app = express();
const server = http.createServer(app);

// Socket.io setup for real-time features
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// Make io accessible to routes
app.set('io', io);

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
});
app.use('/api/', limiter);

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use(errorHandler);

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Join a room for specific region/assessment
  socket.on('join-assessment', (assessmentId) => {
    socket.join(assessmentId);
    console.log(`Client ${socket.id} joined assessment ${assessmentId}`);
  });

  // Handle collaborative editing
  socket.on('update-filters', (data) => {
    socket.to(data.assessmentId).emit('filters-updated', data.filters);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Database connections and server start
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to PostgreSQL
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connected successfully');
    
    // Sync models (use { force: true } only in development to recreate tables)
    await sequelize.sync({ alter: true });
    console.log('✅ PostgreSQL models synchronized');

    // Connect to MongoDB
    await connectMongoDB();
    console.log('✅ MongoDB connected successfully');

    // Start server
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV}`);
      console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL}`);
    });
  } catch (error) {
    console.error('❌ Server startup failed:', error);
    process.exit(1);
  }
};

startServer();

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing server...');
  await sequelize.close();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

module.exports = { app, io };
