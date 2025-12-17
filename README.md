
# Stock Broker Client Dashboard
A real-time stock broker dashboard built with React and Node.js that allows users to subscribe to stock tickers and receive live price updates via WebSocket connections.

## Features

User Authentication: Email-based login system
Real-time Updates: Stock prices update every second using WebSocket (Socket.IO)
Multiple Users Support: Multiple users can be logged in simultaneously with different subscriptions
Dynamic Subscriptions: Subscribe/unsubscribe to stocks on the fly
Supported Stocks: GOOG, TSLA, AMZN, META, NVDA
Live Price Changes: Visual indicators for price movements (green/red)
Asynchronous Updates: No page refresh required
Responsive Design: Works on desktop and mobile devices

## Technologies Used
### Frontend

- React 18.2.0
- Socket.IO Client
- CSS3 (Gradient designs, animations)

### Backend

- Node.js
- Express.js
- Socket.IO
- CORS

##  Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher) - [Download here](https://nodejs.org/)
- npm (comes with Node.js)
- Git (optional, for cloning)

##  Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/DarshithC/stock-broker-dashboard.git
cd stock-broker-dashboard
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

##  Running the Application

### Start Backend Server
Open a terminal and run:
```bash
cd backend
npm start
```
The backend server will start on `http://localhost:5000`

### Start Frontend Application
Open another terminal and run:
```bash
cd frontend
npm start
```
The frontend will open automatically at `http://localhost:3000`

##  Usage

### Single User Testing
1. Open your browser at `http://localhost:3000`
2. Enter your email (e.g., `user1@example.com`)
3. Click "Login"
4. Select stocks to subscribe to (e.g., GOOG, TSLA)
5. Watch real-time price updates!

### Multiple Users Testing
1. Open `http://localhost:3000` in your main browser
2. Login as `user1@example.com`
3. Subscribe to some stocks (e.g., GOOG, AMZN)
4. Open an **incognito/private window** at `http://localhost:3000`
5. Login as `user2@example.com`
6. Subscribe to different stocks (e.g., META, NVDA)
7. Watch both dashboards update independently in real-time!

## Project Structure

```
stock-broker-dashboard/
├── backend/
│   ├── server.js           # Express & Socket.IO server
│   ├── package.json        # Backend dependencies
│   └── .env               # Environment variables
├── frontend/
│   ├── public/
│   │   └── index.html     # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js       # Login component
│   │   │   ├── Dashboard.js   # Main dashboard
│   │   │   └── StockCard.js   # Stock display card
│   │   ├── App.js         # Main App component
│   │   ├── App.css        # Global styles
│   │   └── index.js       # React entry point
│   └── package.json       # Frontend dependencies
├── .gitignore            # Git ignore rules
└── README.md             # Project documentation
```

##  Configuration

### Backend Configuration
The backend runs on port 5000 by default. To change it, create a `.env` file in the `backend` folder:

```
PORT=5000
```

### Frontend Configuration
The frontend connects to `http://localhost:5000` by default. If you change the backend port, update the Socket.IO connection URLs in:
- `src/components/Dashboard.js`
- `src/components/Login.js`

##  How It Works

1. **User Login**: User enters email, which is sent to the backend API
2. **WebSocket Connection**: Frontend establishes Socket.IO connection with backend
3. **Stock Subscription**: User selects stocks, subscription list sent to server
4. **Price Generation**: Backend generates random price changes every second (±1%)
5. **Real-time Updates**: Server emits price updates only to subscribed users
6. **UI Update**: Frontend receives updates and re-renders stock cards

##  Features Breakdown

### Real-time Price Updates
- Prices update every 1 second
- Random price fluctuation of ±1%
- Historical price comparison for change calculation

### Multi-user Support
- Each user has independent subscriptions
- Asynchronous updates for all connected users
- No interference between user sessions

### Visual Feedback
- Green background for price increases
- Red background for price decreases
- Timestamp showing last update time
- Smooth animations and transitions

##  Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
npx kill-port 5000

# Kill process on port 3000 (frontend)
npx kill-port 3000
```

### CORS Errors
Make sure both frontend and backend are running, and the CORS origin in `backend/server.js` matches your frontend URL.

### WebSocket Connection Issues
- Check that backend is running before frontend
- Verify firewall isn't blocking port 5000
- Clear browser cache and reload

##  Future Enhancements

- [ ] Real stock API integration (Alpha Vantage, Yahoo Finance)
- [ ] User authentication with JWT
- [ ] Persistent user subscriptions in database
- [ ] Stock price history charts
- [ ] Buy/Sell functionality
- [ ] Portfolio management
- [ ] Price alerts and notifications
- [ ] Dark mode toggle

##  License

This project is open source and available under the [MIT License](LICENSE).

##  Author

**Darshith**
- GitHub: [@DarshithC](https://github.com/DarshtihC)
- Email: darshithcraj123.gmail.com

