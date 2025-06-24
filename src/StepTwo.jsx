
import React, { useState, useEffect } from 'react';

const createPairs = (words) => {
  const pairs = [];
  for (let i = 0; i < words.length - 1; i += 2) {
    pairs.push([words[i], words[i + 1]]);
  }
  return pairs;
};

const StepTwo = ({ words, onComplete }) => {
  const [pairs, setPairs] = useState([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const shuffled = [...words].sort(() => 0.5 - Math.random());
    setPairs(createPairs(shuffled));
  }, [words]);

  const handleChoice = (choice) => {
    setSelected((prev) => [...prev, choice]);
    if (index + 1 < pairs.length) {
      setIndex(index + 1);
    } else {
      onComplete([...selected, choice]);
    }
  };

  if (!pairs.length) return <p className="text-center">Preparing word pairs...</p>;

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-6">Step 2: Pick your preference</h2>
      <p className="text-lg mb-4">{index + 1} of {pairs.length}</p>
      <div className="flex justify-center gap-6">
        <button onClick={() => handleChoice(pairs[index][0])} className="px-6 py-3 bg-blue-500 text-white rounded text-lg">
          {pairs[index][0]}
        </button>
        <button onClick={() => handleChoice(pairs[index][1])} className="px-6 py-3 bg-indigo-500 text-white rounded text-lg">
          {pairs[index][1]}
        </button>
      </div>
    </div>
  );
};

export default StepTwo;
