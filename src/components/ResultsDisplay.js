import React from 'react';
import './ResultsDisplay.css';

const ResultsDisplay = ({ results, isLoading }) => {
  if (isLoading) {
    return (
      <div className="results-display">
        <h3>🔄 Testing Models...</h3>
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Running performance tests...</p>
        </div>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="results-display">
        <h3>📊 Test Results</h3>
        <div className="no-results">
          <p>No test results yet. Run a test to see performance metrics.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="results-display">
      <h3>📊 Test Results</h3>
      <div className="results-grid">
        {results.map((result, index) => (
          <div key={index} className={`result-card ${result.error ? 'error' : 'success'}`}>
            <div className="result-header">
              <h4 className="model-name">{result.model}</h4>
              <div className="result-status">
                {result.error ? '❌' : '✅'}
              </div>
            </div>
            
            {result.error ? (
              <div className="error-message">
                <p>{result.error}</p>
              </div>
            ) : (
              <div className="result-metrics">
                <div className="metric">
                  <span className="metric-label">⚡ Time to First Token:</span>
                  <span className="metric-value">{result.ttft}</span>
                </div>
                <div className="metric">
                  <span className="metric-label">🏁 Total Time:</span>
                  <span className="metric-value">{result.totalTime}</span>
                </div>
                <div className="metric">
                  <span className="metric-label">🚀 Speed:</span>
                  <span className="metric-value">{result.speed} tok/sec</span>
                </div>
                <div className="metric">
                  <span className="metric-label">📝 Tokens:</span>
                  <span className="metric-value">{result.tokens}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsDisplay;
