// WordPreferenceApp.jsx
import React, { useState } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import Result from './Result';

const ReviewStep = ({ title, words, onBack, onNext }) => (
  <div className="text-center">
    <h2 className="text-xl font-semibold mb-4">Review: {title}</h2>
    <ul className="bg-white shadow rounded p-4 mb-6 space-y-1 text-left max-w-md mx-auto">
      {words.map((word, i) => (
        <li key={i} className="p-1 border-b last:border-none">{word}</li>
      ))}
    </ul>
    <div className="flex justify-center gap-4">
      <button
        onClick={onBack}
        className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        Back to Step
      </button>
      <button
        onClick={onNext}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Next
      </button>
    </div>
  </div>
);

const WordPreferenceApp = () => {
  const [step, setStep] = useState(1);
  const [responses, setResponses] = useState({ yes: [], maybe: [], no: [] });
  const [finalChoices, setFinalChoices] = useState([]);
  const [rankedWords, setRankedWords] = useState([]);

  const handleStepOneComplete = (responses) => {
    setResponses(responses);
    setStep(1.5);
  };

  const handleStepTwoComplete = (selectedWords) => {
    setFinalChoices(selectedWords);
    setStep(2.5);
  };

  const handleStepThreeComplete = (ranked) => {
    setRankedWords(ranked);
    setStep(4);
  };

  return (
    <div className="p-6 max-w-xl mx-auto font-sans text-gray-800">
      {step === 1 && <StepOne onComplete={handleStepOneComplete} />}
      {step === 1.5 && (
        <ReviewStep
          title="Step 1 Selections"
          words={[...responses.yes, ...responses.maybe]}
          onBack={() => setStep(1)}
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && <StepTwo words={[...responses.yes, ...responses.maybe]} onComplete={handleStepTwoComplete} />}
      {step === 2.5 && (
        <ReviewStep
          title="Step 2 Preferences"
          words={finalChoices}
          onBack={() => setStep(2)}
          onNext={() => setStep(3)}
        />
      )}
      {step === 3 && <StepThree words={finalChoices} onComplete={handleStepThreeComplete} />}
      {step === 4 && <Result selectedWords={rankedWords} />}
    </div>
  );
};

export default WordPreferenceApp;
