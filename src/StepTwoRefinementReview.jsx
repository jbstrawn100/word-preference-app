
// StepTwoRefinementReview.jsx
import React from 'react';

const StepTwoRefinementReview = ({ words, onBack, onNext }) => {
  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-4">Review Your Refined Selections</h2>
      <ul className="bg-white shadow rounded p-4 mb-6 max-w-md mx-auto space-y-2 text-left">
        {words.map((word, index) => (
          <li key={index} className="p-2 border-b last:border-none">
            {word}
          </li>
        ))}
      </ul>
      <div className="flex justify-center gap-4">
        <button
          onClick={onBack}
          className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Continue to Ranking
        </button>
      </div>
    </div>
  );
};

export default StepTwoRefinementReview;
