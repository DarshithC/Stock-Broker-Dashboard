const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Supported stocks
const SUPPORTED_STOCKS = ['GOOG', 'TSLA', 'AMZN', 'META', 'NVDA'];

// Store user subscriptions: { socketId: { email, stocks: [] } }
const userSubscriptions = new Map();

// Initial stock prices
const stockPrices = {
  'GOOG': 140.50,
  'TSLA': 245.30,
  'AMZN': 178.25,
  'META': 485.60,
  'NVDA': 875.90
};

// Generate random price change
function generatePriceChange(currentPrice) {
  const changePercent = (Math.random() - 0.5) * 0.02; // ±1% change
  const newPrice = currentPrice * (1 + changePercent);
  return Math.round(newPrice * 100) / 100; // Round to 2 decimals
}

// Update stock prices every second
setInterval(() => {
  SUPPORTED_STOCKS.forEach(ticker => {
    stockPrices[ticker] = generatePriceChange(stockPrices[ticker]);
  });

  // Emit price updates to subscribed users
  userSubscriptions.forEach((userData, socketId) => {
    const socket = io.sockets.sockets.get(socketId);
    if (socket && userData.stocks.length > 0) {
      const userStockPrices = {};
      userData.stocks.forEach(ticker => {
        userStockPrices[ticker] = stockPrices[ticker];
      });
      socket.emit('priceUpdate', userStockPrices);
    }
  });
}, 1000);

// API Routes
app.get('/api/stocks', (req, res) => {
  res.json({ stocks: SUPPORTED_STOCKS });
});

app.post('/api/login', (req, res) => {
  const { email } = req.body;
  
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  
  res.json({ 
    success: true, 
    email,
    message: 'Login successful' 
  });
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  
  // User login
  socket.on('userLogin', (email) => {
    userSubscriptions.set(socket.id, { email, stocks: [] });
    console.log(`User logged in: ${email}`);
  });
  
  // Subscribe to stocks
  socket.on('subscribe', (stocks) => {
    const userData = userSubscriptions.get(socket.id);
    if (userData) {
      userData.stocks = stocks;
      console.log(`User ${userData.email} subscribed to:`, stocks);
      
      // Send initial prices
      const initialPrices = {};
      stocks.forEach(ticker => {
        initialPrices[ticker] = stockPrices[ticker];
      });
      socket.emit('priceUpdate', initialPrices);
    }
  });
  
  // Unsubscribe from a stock
  socket.on('unsubscribe', (ticker) => {
    const userData = userSubscriptions.get(socket.id);
    if (userData) {
      userData.stocks = userData.stocks.filter(s => s !== ticker);
      console.log(`User ${userData.email} unsubscribed from ${ticker}`);
    }
  });
  
  // Disconnect
  socket.on('disconnect', () => {
    const userData = userSubscriptions.get(socket.id);
    if (userData) {
      console.log(`User disconnected: ${userData.email}`);
    }
    userSubscriptions.delete(socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});