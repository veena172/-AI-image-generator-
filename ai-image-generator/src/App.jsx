import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);

  // You can replace this with environment variable later
  const accessKey = 'WfcITMgR6_j5s5cvOz-VZm6q8T4ZngffeFnV-3QXmwI';

  const handleGenerate = async () => {
    if (!prompt) {
      alert("Please enter a prompt!");
      return;
    }

    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(prompt)}&client_id=${accessKey}`
      );

      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setImage(data.results[0].urls.regular);
      } else {
        alert('No image found for that prompt!');
      }
    } catch (error) {
      console.error('Error fetching image:', error);
      alert('Something went wrong while generating the image.');
    }
  };

  return (
    <div className="main-wrapper">
      <div className="card">
        <h1>🤖 AI Image Generator</h1>
        <div className="input-group">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. robot in space"
          />
          <button onClick={handleGenerate}>Generate</button>
        </div>
        {image && (
          <div className="image-box">
            <img src={image} alt="Generated" />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
