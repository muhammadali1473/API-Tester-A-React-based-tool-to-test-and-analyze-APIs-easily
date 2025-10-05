import React from 'react';
import './TestPrompt.css';

const TestPrompt = ({ prompt, onPromptChange }) => {
  return (
    <div className="test-prompt">
      <label htmlFor="test-prompt" className="prompt-label">
        💬 Test Prompt
      </label>
      <textarea
        id="test-prompt"
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        placeholder="Enter your test prompt here..."
        className="prompt-textarea"
        rows="4"
      />
      <div className="prompt-info">
        <p>This prompt will be sent to all selected models</p>
        <div className="prompt-stats">
          <span>Characters: {prompt.length}</span>
          <span>Words: {prompt.split(/\s+/).filter(word => word.length > 0).length}</span>
        </div>
      </div>
    </div>
  );
};

export default TestPrompt;
