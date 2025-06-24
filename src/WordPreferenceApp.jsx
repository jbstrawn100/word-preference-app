
import React, { useState } from 'react';
import WelcomeScreen from './WelcomeScreen';
import StepOne from './StepOne';
import StepOneReview from './StepOneReview';
import StepTwo from './StepTwo';
import StepTwoRefinement from './StepTwoRefinement';
import StepThree from './StepThree';
import Result from './Result';

const ReviewStep = ({ title, words, onBack, onNext }) => (
  <div className="text-center">
    <h2 className="mb-4 text-xl font-semibold">Review: {title}</h2>
    <ul className="bg-white shadow rounded p-4 mb-6 space-y-1 text-left max-w-md mx-auto">
      {words.map((word, i) => (
        <li key={i} className="p-1 border-b last:border-none">{word}</li>
      ))}
    </ul>
    <div className="flex justify-center gap-4">
      <button onClick={onBack} className="px-4 py-2 bg-gray-500 text-white rounded">Back</button>
      <button onClick={onNext} className="px-4 py-2 bg-blue-600 text-white rounded">Next</button>
    </div>
  </div>
);

const WordPreferenceApp = () => {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState({ yes: [], maybe: [], no: [] });
  const [finalChoices, setFinalChoices] = useState([]);
  const [rankedWords, setRankedWords] = useState([]);

  const handleStart = (name, email) => {
    fetch('https://script.google.com/macros/s/AKfycbx24MLWZAOp6tSpHBEovq9irvUib8tRRsKYz6csLyOKiStxNIKjGc3vPak5Drol6PSi6g/exec', {
      method: 'POST',
      body: JSON.stringify({ name, email, started: true }),
      headers: { 'Content-Type': 'application/json' },
    });
    setStep(1);
  };

  const handleStepOneComplete = (data) => {
    setResponses(data);
    setStep(1.25);
  };

  const handleStepOneReviewComplete = (updated) => {
    setResponses(updated);
    setStep(1.5);
  };

  const handleStepTwoComplete = (selected) => {
    setFinalChoices(selected);
    if (selected.length > 20) {
      setStep(2.75); // to refinement step
    } else {
      setStep(3);
    }
  };

  const handleRefinementComplete = (refined) => {
    setFinalChoices(refined);
    setStep(3);
  };

  const handleStepThreeComplete = (ranked) => {
    setRankedWords(ranked);
    setStep(4);
  };

  const validFinals = finalChoices.filter(
    word => responses.yes.includes(word) || responses.maybe.includes(word)
  );

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-3xl bg-white p-6 rounded shadow-md">
        {step === 0 && <WelcomeScreen onStart={handleStart} />}
        {step === 1 && <StepOne onComplete={handleStepOneComplete} />}
        {step === 1.25 && (
          <StepOneReview
            responses={responses}
            onBack={() => setStep(1)}
            onNext={handleStepOneReviewComplete}
          />
        )}
        {step === 1.5 && (
          <ReviewStep
            title="Step 1 Selections"
            words={[...responses.yes, ...responses.maybe]}
            onBack={() => setStep(1.25)}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <StepTwo
            words={[...responses.yes, ...responses.maybe]}
            onComplete={handleStepTwoComplete}
          />
        )}
        {step === 2.75 && (
          <StepTwoRefinement
            words={finalChoices}
            onComplete={handleRefinementComplete}
            onBack={() => setStep(2)}
          />
        )}
        {step === 3 && (
          <StepThree
            words={validFinals}
            onComplete={handleStepThreeComplete}
          />
        )}
        {step === 4 && <Result selectedWords={rankedWords} />}
      </div>
    </div>
  );
};

export default WordPreferenceApp;
