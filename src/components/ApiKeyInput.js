import React, { useState } from 'react';
import './ApiKeyInput.css';

const ApiKeyInput = ({ onApiKeyChange, apiKey }) => {
  const [showKey, setShowKey] = useState(false);

  const handleInputChange = (e) => {
    onApiKeyChange(e.target.value);
  };

  const toggleVisibility = () => {
    setShowKey(!showKey);
  };

  return (
    <div className="api-key-input">
      <label htmlFor="api-key" className="api-key-label">
        🔑 API Key
      </label>
      <div className="api-key-container">
        <input
          id="api-key"
          type={showKey ? 'text' : 'password'}
          value={apiKey}
          onChange={handleInputChange}
          placeholder="Enter your API key..."
          className="api-key-field"
        />
        <button
          type="button"
          onClick={toggleVisibility}
          className="toggle-visibility"
          aria-label={showKey ? 'Hide API key' : 'Show API key'}
        >
          {showKey ? '🙈' : '👁️'}
        </button>
      </div>
      <p className="api-key-help">
        Your API key is stored locally and never sent to our servers
      </p>
    </div>
  );
};

export default ApiKeyInput;
