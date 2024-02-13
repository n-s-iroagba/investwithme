import React, { useEffect } from 'react';

const NewsWidget: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "feedMode": "all_symbols",
      "isTransparent": false,
      "displayMode": "regular",
      "width": 400,
      "height": 550,
      "colorTheme": "",
      "locale": "en"
    });
    const container = document.querySelector('.tradingview-widget-container__widget');
    if (container) {
      container.appendChild(script);
    }

    return () => {
  
      if (container && container.firstChild === script) {
        container.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow noreferrer" target="_blank">
          <span style={{color:'transparent'}}>Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
};

export default NewsWidget;
