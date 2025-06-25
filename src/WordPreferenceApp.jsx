
// WordPreferenceApp.jsx (Updated with Step 2.5 Review Flow)
import React, { useState } from 'react';
import StepOne from './StepOne';
import StepOneReview from './StepOneReview';
import StepTwo from './StepTwo';
import StepTwoRefinement from './StepTwoRefinement';
import StepTwoRefinementReview from './StepTwoRefinementReview';
import StepThree from './StepThree';
import Result from './Result';
import WelcomeScreen from './WelcomeScreen';

const WordPreferenceApp = () => {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState({ yes: [], maybe: [], no: [] });
  const [finalChoices, setFinalChoices] = useState([]);
  const [rankedWords, setRankedWords] = useState([]);
  const [refinedChoices, setRefinedChoices] = useState([]);

  const handleStepOneComplete = (responses) => {
    setResponses(responses);
    setStep(1.25);
  };

  const handleStepOneReviewComplete = (updatedResponses) => {
    setResponses(updatedResponses);
    setStep(2);
  };

  const handleStepTwoComplete = (selectedWords) => {
    if (selectedWords.length > 20) {
      setFinalChoices(selectedWords);
      setStep(2.5);
    } else {
      setFinalChoices(selectedWords);
      setStep(3);
    }
  };

  const handleStepTwoRefinementComplete = (refinedWords) => {
    setRefinedChoices(refinedWords);
    setStep(2.75);
  };

  const handleStepThreeComplete = (ranked) => {
    setRankedWords(ranked);
    setStep(4);
  };

  const validStepTwoWords = [...responses.yes, ...responses.maybe];
  const finalStepThreeWords = refinedChoices.length > 0 ? refinedChoices : finalChoices;

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
        {step === 2 && (
          <StepTwo
            words={validStepTwoWords}
            onComplete={handleStepTwoComplete}
          />
        )}
        {step === 2.5 && (
          <StepTwoRefinement
            words={finalChoices}
            onComplete={handleStepTwoRefinementComplete}
            onBack={() => setStep(2)}
          />
        )}
        {step === 2.75 && (
          <StepTwoRefinementReview
            words={refinedChoices}
            onBack={() => setStep(2.5)}
            onNext={() => setStep(3)}
          />
        )}
        {step === 3 && (
          <StepThree
            words={finalStepThreeWords}
            onComplete={handleStepThreeComplete}
          />
        )}
        {step === 4 && <Result selectedWords={rankedWords} hideEmailInput />}
      </div>
    </div>
  );
};

export default WordPreferenceApp;
