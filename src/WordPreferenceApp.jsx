
// WordPreferenceApp.jsx (Material Design + Centered Layout)
import React, { useState } from 'react';
import StepOne from './StepOne';
import StepOneReview from './StepOneReview';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import Result from './Result';

const ReviewStep = ({ title, words, onBack, onNext }) => (
  <div className="text-center">
    <h2 className="mdc-typography--headline6 mb-4">Review: {title}</h2>
    <ul className="bg-white shadow rounded p-4 mb-6 space-y-1 text-left max-w-md mx-auto">
      {words.map((word, i) => (
        <li key={i} className="p-1 border-b last:border-none">{word}</li>
      ))}
    </ul>
    <div className="flex justify-center gap-4">
      <button className="mdc-button" onClick={onBack}>
        <span className="mdc-button__label">Back to Step</span>
      </button>
      <button className="mdc-button mdc-button--raised" onClick={onNext}>
        <span className="mdc-button__label">Next</span>
      </button>
    </div>
  </div>
);

const WelcomeScreen = ({ onStart }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleStart = () => {
    if (!name || !email) {
      alert('Please enter your name and email to continue.');
      return;
    }
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    onStart();
  };

  return (
    <div className="text-center">
      <h1 className="mdc-typography--headline4 mb-4">Brand Characteristics Exercise</h1>
      <p className="mdc-typography--body1 mb-4 max-w-md mx-auto">
        The goal of this exercise is to narrow your list of potential attributes so you can better understand who you are as a brand.
      </p>
      <div className="mb-4">
        <input
          className="w-full p-2 mb-2 border rounded"
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full p-2 border rounded"
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button className="mdc-button mdc-button--raised" onClick={handleStart}>
        <span className="mdc-button__label">Let's Get Started</span>
      </button>
      <p className="mt-2 text-xs text-gray-500 max-w-md mx-auto">
        By continuing, you agree to let our team contact you with marketing and update emails.
      </p>
    </div>
  );
};

const WordPreferenceApp = () => {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState({ yes: [], maybe: [], no: [] });
  const [finalChoices, setFinalChoices] = useState([]);
  const [rankedWords, setRankedWords] = useState([]);

  const handleStepOneComplete = (responses) => {
    setResponses(responses);
    setStep(1.25);
  };

  const handleStepOneReviewComplete = (updatedResponses) => {
    setResponses(updatedResponses);
    setStep(1.5);
  };

  const handleStepTwoComplete = (selectedWords) => {
    setFinalChoices(selectedWords);
    setStep(2.5);
  };

  const handleStepThreeComplete = (ranked) => {
    setRankedWords(ranked);
    const name = localStorage.getItem('userName') || '';
    const email = localStorage.getItem('userEmail') || '';

    fetch('https://script.google.com/macros/s/AKfycbx24MLWZAOp6tSpHBEovq9irvUib8tRRsKYz6csLyOKiStxNIKjGc3vPak5Drol6PSi6g/exec', {
      method: 'POST',
      body: JSON.stringify({ name, email, selectedWords: ranked }),
      headers: { 'Content-Type': 'application/json' },
    });

    setStep(4);
};

  const validFinalChoices = finalChoices.filter(
    word => responses.yes.includes(word) || responses.maybe.includes(word)
  );

  return (
    <div className="mdc-typography" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '1rem' }}>
      <div className="w-full max-w-2xl">
        {step === 0 && <WelcomeScreen onStart={() => setStep(1)} />}
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
        {step === 2.5 && (
          <ReviewStep
            title="Step 2 Preferences"
            words={finalChoices}
            onBack={() => setStep(2)}
            onNext={() => setStep(3)}
          />
        )}
        {step === 3 && (
          <StepThree
            words={validFinalChoices}
            onComplete={handleStepThreeComplete}
          />
        )}
        {step === 4 && <Result selectedWords={rankedWords} hideEmailInput />}
      </div>
    </div>
  );
};

export default WordPreferenceApp;
