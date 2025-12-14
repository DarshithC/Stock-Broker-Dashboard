import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import StockCard from './StockCard';

const SUPPORTED_STOCKS = ['GOOG', 'TSLA', 'AMZN', 'META', 'NVDA'];

function Dashboard({ user, onLogout }) {
  const [socket, setSocket] = useState(null);
  const [subscribedStocks, setSubscribedStocks] = useState([]);
  const [stockPrices, setStockPrices] = useState({});

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.emit('userLogin', user);

    newSocket.on('priceUpdate', (prices) => {
      setStockPrices(prices);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  const handleStockToggle = (ticker) => {
    let newSubscriptions;
    if (subscribedStocks.includes(ticker)) {
      newSubscriptions = subscribedStocks.filter((s) => s !== ticker);
      socket.emit('unsubscribe', ticker);
    } else {
      newSubscriptions = [...subscribedStocks, ticker];
    }
    setSubscribedStocks(newSubscriptions);
    if (socket) {
      socket.emit('subscribe', newSubscriptions);
    }
  };

  const handleUnsubscribe = (ticker) => {
    const newSubscriptions = subscribedStocks.filter((s) => s !== ticker);
    setSubscribedStocks(newSubscriptions);
    if (socket) {
      socket.emit('unsubscribe', ticker);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Stock Dashboard</h1>
        <div className="user-info">
          <span className="user-email">{user}</span>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="subscription-section">
        <h2>Subscribe to Stocks</h2>
        <div className="stock-selector">
          {SUPPORTED_STOCKS.map((ticker) => (
            <div
              key={ticker}
              className={`stock-chip ${
                subscribedStocks.includes(ticker) ? 'selected' : ''
              }`}
              onClick={() => handleStockToggle(ticker)}
            >
              {ticker}
            </div>
          ))}
        </div>
      </div>

      <div className="stocks-section">
        {subscribedStocks.length === 0 ? (
          <div className="empty-state">
            <h3>No stocks subscribed</h3>
            <p>Select stocks from above to start tracking their prices</p>
          </div>
        ) : (
          <div className="stocks-grid">
            {subscribedStocks.map((ticker) => (
              <StockCard
                key={ticker}
                ticker={ticker}
                price={stockPrices[ticker]}
                onUnsubscribe={handleUnsubscribe}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;