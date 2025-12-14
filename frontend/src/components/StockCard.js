import React, { useState, useEffect } from 'react';

function StockCard({ ticker, price, onUnsubscribe }) {
  const [prevPrice, setPrevPrice] = useState(null);
  const [priceChange, setPriceChange] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    if (price !== undefined && prevPrice !== null) {
      setPriceChange(price - prevPrice);
    }
    if (price !== undefined) {
      setPrevPrice(price);
      setLastUpdate(new Date());
    }
  }, [price]);

  const getChangeClass = () => {
    if (priceChange > 0) return 'positive';
    if (priceChange < 0) return 'negative';
    return 'neutral';
  };

  const formatPrice = (p) => {
    return p !== undefined ? `$${p.toFixed(2)}` : 'Loading...';
  };

  const formatChange = (change) => {
    if (change === 0) return '0.00';
    const sign = change > 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}`;
  };

  return (
    <div className="stock-card">
      <div className="stock-header">
        <div className="stock-ticker">{ticker}</div>
        <button
          className="unsubscribe-btn"
          onClick={() => onUnsubscribe(ticker)}
        >
          Unsubscribe
        </button>
      </div>
      <div className="stock-price">{formatPrice(price)}</div>
      <div className={`stock-change ${getChangeClass()}`}>
        {formatChange(priceChange)}
      </div>
      <div className="last-update">
        Updated: {lastUpdate.toLocaleTimeString()}
      </div>
    </div>
  );
}

export default StockCard;