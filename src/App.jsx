import { useState } from 'react'
import './App.css'

function App() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)
  const [error, setError] = useState(null)
  const [loadingMessage, setLoadingMessage] = useState('Crafting your image...')

  const messages = [
    'Analyzing your prompt...',
    'Dreaming in pixels...',
    'Applying artistic touch...',
    'Refining details...',
    'Almost there...',
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    setLoading(true)
    if (imageUrl) URL.revokeObjectURL(imageUrl)
    setImageUrl(null)
    setError(null)

    // Message rotation effect
    let messageIndex = 0;
    const interval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      setLoadingMessage(messages[messageIndex]);
    }, 1500);
    
    try {
      const response = await fetch(
        "/api-hf",
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_HF_TOKEN}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ inputs: prompt }),
        }
      );

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const newUrl = URL.createObjectURL(blob);
      setImageUrl(newUrl);
    } catch (err) {
      console.error("Generation error:", err);
      setError(err.message || 'Failed to generate image. Please try again.');
    } finally {
      clearInterval(interval);
      setLoading(false);
      setLoadingMessage('Crafting your image...');
    }
  }

  return (
    <div className="container">
      <header className="header">
        <h1>AI Image Generator</h1>
        <p className="subtitle">Transform your words into breathtaking art</p>
      </header>

      <div className="generator-card">
        <div className="input-group">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt..."
            className="text-input"
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            aria-label="Prompt for image generation"
          />
          <button 
            onClick={handleGenerate} 
            disabled={loading || !prompt.trim()}
            className="generate-btn"
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>

        {error && (
          <div className="error-message" role="alert">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        {loading && (
          <div className="loading-container" aria-live="polite">
            <div className="spinner"></div>
            <p className="loading-text">{loadingMessage}</p>
          </div>
        )}

        {imageUrl && !loading && (
          <div className="image-display animate-fade-in">
            <img src={imageUrl} alt="Generated AI artwork" className="generated-img" />
            <div className="action-bar">
              <button className="download-btn" onClick={() => window.open(imageUrl, '_blank')}>
                Open Full Resolution
              </button>
            </div>
          </div>
        )}

        {!imageUrl && !loading && (
          <div className="placeholder-section">
            <div className="placeholder-icon">✨</div>
            <p>Your creation will appear here</p>
            <span className="placeholder-hint">Try "A cyberpunk city in the style of Van Gogh"</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
