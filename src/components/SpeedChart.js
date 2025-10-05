import React from 'react';
import './SpeedChart.css';

const SpeedChart = ({ results }) => {
  if (!results || results.length === 0) {
    return (
      <div className="speed-chart">
        <h3>📈 Performance Chart</h3>
        <div className="no-data">
          <p>No data available for chart</p>
        </div>
      </div>
    );
  }

  const validResults = results.filter(result => !result.error);
  
  if (validResults.length === 0) {
    return (
      <div className="speed-chart">
        <h3>📈 Performance Chart</h3>
        <div className="no-data">
          <p>No valid results to display</p>
        </div>
      </div>
    );
  }

  const maxSpeed = Math.max(...validResults.map(r => r.speedValue || 0));
  const maxTime = Math.max(...validResults.map(r => r.totalTimeValue || 0));

  return (
    <div className="speed-chart">
      <h3>📈 Performance Chart</h3>
      <div className="chart-container">
        <div className="chart-section">
          <h4>🚀 Speed (tokens/sec)</h4>
          <div className="bar-chart">
            {validResults.map((result, index) => (
              <div key={index} className="bar-item">
                <div className="bar-label">{result.model}</div>
                <div className="bar-container">
                  <div 
                    className="bar-fill speed-bar"
                    style={{ 
                      width: `${((result.speedValue || 0) / maxSpeed) * 100}%` 
                    }}
                  ></div>
                  <span className="bar-value">{result.speed}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="chart-section">
          <h4>⏱️ Total Time (seconds)</h4>
          <div className="bar-chart">
            {validResults.map((result, index) => (
              <div key={index} className="bar-item">
                <div className="bar-label">{result.model}</div>
                <div className="bar-container">
                  <div 
                    className="bar-fill time-bar"
                    style={{ 
                      width: `${((result.totalTimeValue || 0) / maxTime) * 100}%` 
                    }}
                  ></div>
                  <span className="bar-value">{result.totalTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeedChart;
