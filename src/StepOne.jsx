// StepOne.jsx
import React, { useState } from 'react';

const initialWords = [
  "Adventurous", "Bold", "Daring", "Risk-taking", "Edgy", "Experimental", "Energetic",
  "Disruptive", "Visionary", "Curious", "Safe", "Reliable", "Cautious", "Stable",
  "Secure", "Predictable", "Consistent", "Steady", "Traditional", "Conservative",
  "Approachable", "Friendly", "Warm", "Inviting", "Down-to-earth", "Welcoming",
  "Personal", "Humble", "Simple", "Genuine", "Exclusive", "Premium", "Elite",
  "Private", "Sophisticated", "Refined", "Discerning", "Niche", "Upscale",
  "Selective", "Bold (Visual)", "Loud", "Vibrant", "Expressive", "Eye-catching",
  "Confident", "Brash", "Dynamic", "Assertive", "Dramatic", "Subtle", "Understated",
  "Soft", "Elegant", "Reserved", "Nuanced", "Polished", "Calm", "Sleek", "Tasteful",
  "Casual", "Relaxed", "Informal", "Laid-back", "Playful", "Fun", "Spontaneous",
  "Easygoing", "Unpretentious", "Lighthearted", "Formal", "Classy", "Graceful",
  "Cultured", "High-end", "Poised", "Well-crafted", "Serene", "Detailed", "Precise",
  "Articulate", "Complex", "Thoughtful", "Analytical", "Logical", "Thorough",
  "Meticulous", "Technical", "Minimalist", "Clean", "Streamlined", "Modern",
  "Intuitive", "Essential", "Quiet", "Balanced", "Clear"
];

const StepOne = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [yes, setYes] = useState([]);
  const [maybe, setMaybe] = useState([]);
  const [no, setNo] = useState([]);

  const currentWord = initialWords[currentIndex];

  const handleSelection = (category) => {
    if (category === 'yes') setYes([...yes, currentWord]);
    else if (category === 'maybe') setMaybe([...maybe, currentWord]);
    else if (category === 'no') setNo([...no, currentWord]);

    const nextIndex = currentIndex + 1;
    if (nextIndex < initialWords.length) {
      setCurrentIndex(nextIndex);
    } else {
      onComplete({ yes, maybe, no });
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-4">Step 1: Word Sorting</h2>
      <p className="mb-6">Decide how each word feels to you as part of your brand identity.</p>
      {currentWord ? (
        <>
          <div className="text-3xl font-bold mb-6">{currentWord}</div>
          <div className="flex justify-center gap-6">
            <button
              onClick={() => handleSelection('yes')}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Yes
            </button>
            <button
              onClick={() => handleSelection('maybe')}
              className="px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Maybe
            </button>
            <button
              onClick={() => handleSelection('no')}
              className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              No
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            {currentIndex + 1} of {initialWords.length}
          </p>
        </>
      ) : (
        <p className="text-lg">Loading...</p>
      )}
    </div>
  );
};

export default StepOne;
