// StepOneReview.jsx
import React, { useState } from 'react';

const StepOneReview = ({ responses, onBack, onNext }) => {
  const [updatedResponses, setUpdatedResponses] = useState({
    yes: [...responses.yes],
    maybe: [...responses.maybe],
    no: [...responses.no],
  });

  const handleMove = (word, from, to) => {
    if (from === to) return;
    setUpdatedResponses((prev) => {
      const updated = {
        ...prev,
        [from]: prev[from].filter((w) => w !== word),
        [to]: [...prev[to], word],
      };
      return updated;
    });
  };

  const renderColumn = (label, key) => (
    <div className="flex-1">
      <h3 className="text-lg font-semibold mb-2 text-center">{label}</h3>
      <div className="bg-white border rounded p-2 min-h-[200px]">
        {updatedResponses[key].map((word) => (
          <div key={word} className="flex justify-between items-center border-b last:border-none py-1">
            <span>{word}</span>
            <div className="flex gap-1">
              {['yes', 'maybe', 'no'].filter((k) => k !== key).map((target) => (
                <button
                  key={target}
                  onClick={() => handleMove(word, key, target)}
                  className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
                >
                  → {target}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-4">Review & Adjust Step 1 Selections</h2>
      <div className="flex gap-4 mb-6">
        {renderColumn('Yes', 'yes')}
        {renderColumn('Maybe', 'maybe')}
        {renderColumn('No', 'no')}
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={onBack}
          className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Back
        </button>
        <button
          onClick={() => onNext(updatedResponses)}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Confirm and Continue
        </button>
      </div>
    </div>
  );
};

export default StepOneReview;
