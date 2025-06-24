
import React, { useState } from 'react';

const StepTwoRefinement = ({ words, onComplete, onBack }) => {
  const [selected, setSelected] = useState([]);

  const handleSelect = (word) => {
    if (selected.includes(word)) return;
    setSelected((prev) => [...prev, word]);
  };

  const pairs = [];
  for (let i = 0; i < words.length - 1; i += 2) {
    pairs.push([words[i], words[i + 1]]);
  }
  if (words.length % 2 === 1) {
    pairs.push([words[words.length - 1]]);
  }

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-4">Refine Your Selections</h2>
      <p className="mb-4">Choose the word from each pair that best fits your brand.</p>
      <div className="grid gap-4 mb-6">
        {pairs.map(([a, b], i) => (
          <div key={i} className="flex justify-center gap-6">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => handleSelect(a)}
            >
              {a}
            </button>
            {b && (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => handleSelect(b)}
              >
                {b}
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-4">
        <button
          onClick={onBack}
          className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Back
        </button>
        <button
          onClick={() => onComplete(selected)}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default StepTwoRefinement;
