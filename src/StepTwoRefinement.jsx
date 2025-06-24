
import React, { useState } from 'react';

const StepTwoRefinement = ({ words, onComplete, onBack }) => {
  const [index, setIndex] = useState(0);
  const [selections, setSelections] = useState([]);

  const pairs = [];
  for (let i = 0; i < words.length - 1; i += 2) {
    pairs.push([words[i], words[i + 1]]);
  }
  if (words.length % 2 === 1) {
    pairs.push([words[words.length - 1]]);
  }

  const handleSelect = (word) => {
    setSelections([...selections, word]);
    if (index + 1 < pairs.length) {
      setIndex(index + 1);
    } else {
      onComplete(selections.concat(word));
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-4">Refine Your Selections</h2>
      <p className="mb-4">Choose the word that best represents your brand.</p>
      <div className="flex justify-center gap-6 mb-6">
        {pairs[index].map((word) => (
          <button
            key={word}
            onClick={() => handleSelect(word)}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {word}
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-600">Pair {index + 1} of {pairs.length}</p>
      <div className="mt-6">
        <button
          onClick={onBack}
          className="px-4 py-2 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default StepTwoRefinement;
