
import React, { useState } from 'react';

const WORDS = [
  "Adventurous", "Bold", "Daring", "Risk-taking", "Edgy", "Experimental",
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
  "Balanced", "Clear"
];

const StepOne = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({ yes: [], maybe: [], no: [] });

  const handleAnswer = (type) => {
    const word = WORDS[index];
    setAnswers((prev) => ({
      ...prev,
      [type]: [...prev[type], word],
    }));
    if (index + 1 < WORDS.length) {
      setIndex(index + 1);
    } else {
      onComplete(answers);
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-6">Step 1: Choose your word preferences</h2>
      <p className="text-2xl font-medium mb-8">{WORDS[index]}</p>
      <div className="flex justify-center gap-4">
        <button onClick={() => handleAnswer('yes')} className="px-4 py-2 bg-green-500 text-white rounded">Yes</button>
        <button onClick={() => handleAnswer('maybe')} className="px-4 py-2 bg-yellow-400 text-white rounded">Maybe</button>
        <button onClick={() => handleAnswer('no')} className="px-4 py-2 bg-gray-400 text-white rounded">No</button>
      </div>
      <p className="mt-6 text-sm text-gray-600">{index + 1} of {WORDS.length}</p>
    </div>
  );
};

export default StepOne;
