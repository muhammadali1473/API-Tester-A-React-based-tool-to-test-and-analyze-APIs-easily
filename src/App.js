import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ApiKeyInput from './components/ApiKeyInput';
import ModelSelector from './components/ModelSelector';
import TestPrompt from './components/TestPrompt';
import LocationDisplay from './components/LocationDisplay';
import ResultsDisplay from './components/ResultsDisplay';
import SpeedChart from './components/SpeedChart';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [provider, setProvider] = useState('groq');
  const [selectedModels, setSelectedModels] = useState([]);
  const [prompt, setPrompt] = useState('Say hello world in a long paragraph.');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load API key from localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem('apiKey');
    const savedProvider = localStorage.getItem('provider');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
    if (savedProvider) {
      setProvider(savedProvider);
    }
  }, []);

  // Save API key to localStorage when it changes
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('apiKey', apiKey);
    }
    localStorage.setItem('provider', provider);
  }, [apiKey, provider]);

  const handleApiKeyChange = (key) => {
    setApiKey(key);
  };

  const handleProviderChange = (newProvider) => {
    setProvider(newProvider);
    setSelectedModels([]);
  };

  const handleModelToggle = (modelId) => {
    setSelectedModels(prev => 
      prev.includes(modelId) 
        ? prev.filter(id => id !== modelId)
        : [...prev, modelId]
    );
  };

  const handlePromptChange = (newPrompt) => {
    setPrompt(newPrompt);
  };

  const runTests = async () => {
    if (!apiKey) {
      alert('Please enter your API key');
      return;
    }

    if (selectedModels.length === 0) {
      alert('Please select at least one model to test');
      return;
    }

    const modelsToTest = selectedModels;

    setIsLoading(true);
    setResults([]);

    const testResults = [];

    for (const model of modelsToTest) {
      try {
        const start = Date.now();
        
        // Get the correct API endpoint for each provider
        const getApiEndpoint = (provider) => {
          switch(provider) {
            case 'groq':
              return 'https://api.groq.com/openai/v1/chat/completions';
            case 'openai':
              return 'https://api.openai.com/v1/chat/completions';
            case 'anthropic':
              return 'https://api.anthropic.com/v1/messages';
            case 'ollama':
              return 'http://localhost:11434/api/generate';
            case 'other':
              return 'https://api.openai.com/v1/chat/completions'; // Default fallback
            default:
              return 'https://api.groq.com/openai/v1/chat/completions';
          }
        };
        
        const response = await fetch(getApiEndpoint(provider), {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: model,
            messages: [{ role: 'user', content: prompt }],
            stream: true,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let firstTokenTime = null;
        let tokens = 0;
        let content = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') continue;
              
              try {
                const parsed = JSON.parse(data);
                const delta = parsed.choices?.[0]?.delta;
                if (delta?.content) {
                  if (!firstTokenTime) {
                    firstTokenTime = Date.now();
                  }
                  content += delta.content;
                  tokens += delta.content.length;
                }
              } catch (e) {
                // Ignore parsing errors
              }
            }
          }
        }

        const end = Date.now();
        const totalTime = (end - start) / 1000;
        const ttft = firstTokenTime ? (firstTokenTime - start) / 1000 : null;
        const speed = tokens / totalTime;

        testResults.push({
          model,
          ttft: ttft ? `${ttft.toFixed(2)} sec` : 'n/a',
          totalTime: `${totalTime.toFixed(2)} sec`,
          speed: `${speed.toFixed(2)} tok/sec`,
          tokens,
          speedValue: speed,
          totalTimeValue: totalTime,
          content: content.substring(0, 100) + '...'
        });

      } catch (error) {
        testResults.push({
          model,
          error: error.message
        });
      }
    }

    setResults(testResults);
    setIsLoading(false);
  };

  return (
    <div className="App">
      <Navbar />
      
      <div className="main-container">
        <div className="control-panel">
          <div className="provider-selector">
            <h3>🔧 API Provider</h3>
            <div className="provider-options">
              <label className={`provider-option ${provider === 'groq' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="provider"
                  value="groq"
                  checked={provider === 'groq'}
                  onChange={(e) => handleProviderChange(e.target.value)}
                />
                <span>🚀 Groq (Fast & Free)</span>
              </label>
              <label className={`provider-option ${provider === 'openai' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="provider"
                  value="openai"
                  checked={provider === 'openai'}
                  onChange={(e) => handleProviderChange(e.target.value)}
                />
                <span>🤖 OpenAI</span>
              </label>
              <label className={`provider-option ${provider === 'anthropic' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="provider"
                  value="anthropic"
                  checked={provider === 'anthropic'}
                  onChange={(e) => handleProviderChange(e.target.value)}
                />
                <span>🧠 Claude (Anthropic)</span>
              </label>
              <label className={`provider-option ${provider === 'ollama' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="provider"
                  value="ollama"
                  checked={provider === 'ollama'}
                  onChange={(e) => handleProviderChange(e.target.value)}
                />
                <span>🦙 Ollama (Local)</span>
              </label>
              <label className={`provider-option ${provider === 'other' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="provider"
                  value="other"
                  checked={provider === 'other'}
                  onChange={(e) => handleProviderChange(e.target.value)}
                />
                <span>🌟 Other Models</span>
              </label>
            </div>
          </div>

          <ApiKeyInput 
            apiKey={apiKey} 
            onApiKeyChange={handleApiKeyChange} 
          />

          <ModelSelector 
            selectedModels={selectedModels}
            onModelToggle={handleModelToggle}
            provider={provider}
          />

          <TestPrompt 
            prompt={prompt}
            onPromptChange={handlePromptChange}
          />

          <LocationDisplay />

          <button 
            className="run-test-button"
            onClick={runTests}
            disabled={!apiKey || selectedModels.length === 0 || isLoading}
          >
            {isLoading ? '🔄 Testing...' : '🚀 Run Tests'}
          </button>
        </div>

        <div className="results-panel">
          <ResultsDisplay results={results} isLoading={isLoading} />
          <SpeedChart results={results} />
        </div>
      </div>
    </div>
  );
}

export default App;