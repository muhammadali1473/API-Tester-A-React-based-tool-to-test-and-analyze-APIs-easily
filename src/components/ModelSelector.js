import React from 'react';
import './ModelSelector.css';

const ModelSelector = ({ selectedModels, onModelToggle, provider }) => {
  const groqModels = [
    { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B Versatile', description: 'Most capable model' },
    { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B Instant', description: 'Fastest model' },
    { id: 'llama-3.1-70b-versatile', name: 'Llama 3.1 70B Versatile', description: 'High performance' },
    { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B', description: 'Mixture of experts' },
    { id: 'gemma-7b-it', name: 'Gemma 7B IT', description: 'Google Gemma model' },
    { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B Instant', description: 'Ultra fast' },
    { id: 'llama-3.1-70b-versatile', name: 'Llama 3.1 70B Versatile', description: 'Balanced performance' }
  ];

  const openaiModels = [
    { id: 'gpt-4o-mini', name: 'GPT-4o Mini', description: 'Fast and efficient' },
    { id: 'gpt-4o', name: 'GPT-4o', description: 'Most capable' },
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', description: 'Fast and reliable' },
    { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', description: 'High performance' },
    { id: 'gpt-4', name: 'GPT-4', description: 'Advanced reasoning' },
    { id: 'gpt-3.5-turbo-16k', name: 'GPT-3.5 Turbo 16K', description: 'Extended context' }
  ];

  const anthropicModels = [
    { id: 'claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet', description: 'Most capable Claude' },
    { id: 'claude-3-5-haiku-20241022', name: 'Claude 3.5 Haiku', description: 'Fast and efficient' },
    { id: 'claude-3-opus-20240229', name: 'Claude 3 Opus', description: 'Advanced reasoning' },
    { id: 'claude-3-sonnet-20240229', name: 'Claude 3 Sonnet', description: 'Balanced performance' }
  ];

  const ollamaModels = [
    { id: 'llama2', name: 'Llama 2', description: 'Meta Llama 2' },
    { id: 'llama2:13b', name: 'Llama 2 13B', description: 'Larger Llama 2' },
    { id: 'llama2:70b', name: 'Llama 2 70B', description: 'Largest Llama 2' },
    { id: 'codellama', name: 'Code Llama', description: 'Code generation' },
    { id: 'mistral', name: 'Mistral 7B', description: 'Efficient model' },
    { id: 'neural-chat', name: 'Neural Chat', description: 'Conversational AI' },
    { id: 'starling-lm', name: 'Starling LM', description: 'Open source model' },
    { id: 'orca-mini', name: 'Orca Mini', description: 'Lightweight model' }
  ];

  const otherModels = [
    { id: 'gemini-pro', name: 'Gemini Pro', description: 'Google Gemini' },
    { id: 'gemini-pro-vision', name: 'Gemini Pro Vision', description: 'Multimodal Gemini' },
    { id: 'palm-2', name: 'PaLM 2', description: 'Google PaLM' },
    { id: 'cohere-command', name: 'Cohere Command', description: 'Cohere model' },
    { id: 'j2-ultra', name: 'Jurassic-2 Ultra', description: 'AI21 model' },
    { id: 'j2-mid', name: 'Jurassic-2 Mid', description: 'AI21 mid-tier' }
  ];

  const getModelsForProvider = () => {
    switch(provider) {
      case 'groq':
        return groqModels;
      case 'openai':
        return openaiModels;
      case 'anthropic':
        return anthropicModels;
      case 'ollama':
        return ollamaModels;
      case 'other':
        return otherModels;
      default:
        return groqModels;
    }
  };

  const models = getModelsForProvider();

  return (
    <div className="model-selector">
      <h3>🤖 Select Models to Test</h3>
      <p className="model-help-text">
        Choose one or more models to test. You can select multiple models to compare their performance.
      </p>
      <div className="model-grid">
        {models.map((model) => (
          <div
            key={model.id}
            className={`model-card ${selectedModels.includes(model.id) ? 'selected' : ''}`}
            onClick={() => onModelToggle(model.id)}
          >
            <div className="model-header">
              <input
                type="checkbox"
                checked={selectedModels.includes(model.id)}
                onChange={() => onModelToggle(model.id)}
                className="model-checkbox"
              />
              <h4 className="model-name">{model.name}</h4>
            </div>
            <p className="model-description">{model.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelSelector;
