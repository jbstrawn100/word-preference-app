
import React from 'react';

const StepTwoRefinementReview = ({ words, onBack, onNext }) => {
  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-4">Review Your Refined Selections</h2>
      <ul className="bg-white shadow rounded p-4 mb-6 space-y-2 text-left max-w-md mx-auto">
        {words.map((word, i) => (
          <li key={i} className="p-1 border-b last:border-none">{word}</li>
        ))}
      </ul>
      <div className="flex justify-center gap-4">
        <button
          className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
          onClick={onBack}
        >
          Back
        </button>
        <button
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          onClick={onNext}
        >
          Confirm and Continue
        </button>
      </div>
    </div>
  );
};

export default StepTwoRefinementReview;
