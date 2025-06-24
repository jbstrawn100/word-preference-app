import React, { useState } from 'react';

const StepTwo = ({ words, onComplete }) => {
  const [selections, setSelections] = useState([]);

  const toggleSelect = word => {
    setSelections(prev =>
      prev.includes(word) ? prev.filter(w => w !== word) : [...prev, word]
    );
  };

  return (
    <div className="text-center">
      <h2 className="mdc-typography--headline6 mb-4">Step 2: Pick Your Preferred Words</h2>
      <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto">
        {words.map(word => (
          <button
            key={word}
            className={`mdc-button w-full ${selections.includes(word) ? 'mdc-button--raised' : ''}`}
            onClick={() => toggleSelect(word)}
          >
            <span className="mdc-button__label">{word}</span>
          </button>
        ))}
      </div>
      <button className="mt-6 mdc-button mdc-button--raised" onClick={() => onComplete(selections)}>
        <span className="mdc-button__label">Continue</span>
      </button>
    </div>
  );
};

export default StepTwo;
