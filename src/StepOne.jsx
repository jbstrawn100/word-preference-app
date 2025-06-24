import React, { useState } from 'react';

const StepOne = ({ onComplete }) => {
  const allWords = ["Adventurous", "Bold", "Daring", "Risk-taking", "Edgy", "Experimental",
  "Energetic", "Disruptive", "Visionary", "Curious", "Safe", "Reliable",
  "Cautious", "Stable", "Secure", "Predictable", "Consistent", "Steady",
  "Traditional", "Conservative", "Approachable", "Friendly", "Warm",
  "Inviting", "Down-to-earth", "Welcoming", "Personal", "Humble", "Simple",
  "Genuine", "Exclusive", "Premium", "Elite", "Private", "Sophisticated",
  "Refined", "Discerning", "Niche", "Upscale", "Selective", "Bold (Visual)",
  "Loud", "Vibrant", "Expressive", "Eye-catching", "Confident", "Brash",
  "Dynamic", "Assertive", "Dramatic", "Subtle", "Understated", "Soft",
  "Elegant", "Reserved", "Nuanced", "Polished", "Calm", "Sleek", "Tasteful",
  "Casual", "Relaxed", "Informal", "Laid-back", "Playful", "Fun",
  "Spontaneous", "Easygoing", "Unpretentious", "Lighthearted", "Elegant",
  "Formal", "Classy", "Graceful", "Cultured", "High-end", "Poised",
  "Well-crafted", "Sophisticated", "Serene", "Detailed", "Precise",
  "Articulate", "Complex", "Thoughtful", "Analytical", "Logical",
  "Thorough", "Meticulous", "Technical", "Minimalist", "Clean",
  "Streamlined", "Simple", "Modern", "Intuitive", "Essential", "Quiet",
  "Balanced", "Clear"];
  const [responses, setResponses] = useState({ yes: [], maybe: [], no: [] });

  const handleSelection = (word, category) => {
    setResponses(prev => {
      const newResponses = { yes: [], maybe: [], no: [] };
      for (const cat in prev) {
        newResponses[cat] = prev[cat].filter(w => w !== word);
      }
      newResponses[category].push(word);
      return newResponses;
    });
  };

  return (
    <div className="text-center">
      <h2 className="mdc-typography--headline6 mb-4">Step 1: Initial Selection</h2>
      <div className="space-y-4">
        {allWords.map(word => (
          <div key={word} className="flex justify-between items-center border p-2 rounded bg-white shadow-sm max-w-xl mx-auto">
            <span>{word}</span>
            <div className="space-x-2">
              <button className="mdc-button" onClick={() => handleSelection(word, 'no')}>
                <span className="mdc-button__label">No</span>
              </button>
              <button className="mdc-button" onClick={() => handleSelection(word, 'maybe')}>
                <span className="mdc-button__label">Maybe</span>
              </button>
              <button className="mdc-button mdc-button--raised" onClick={() => handleSelection(word, 'yes')}>
                <span className="mdc-button__label">Yes</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-6 mdc-button mdc-button--raised" onClick={() => onComplete(responses)}>
        <span className="mdc-button__label">Continue</span>
      </button>
    </div>
  );
};

export default StepOne;
