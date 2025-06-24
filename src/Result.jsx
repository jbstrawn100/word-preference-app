import React from 'react';

const Result = ({ selectedWords, hideEmailInput }) => {
  const topWords = selectedWords.slice(0, 7);

  const handleDownload = () => {
    const name = localStorage.getItem('userName') || 'user';
    const blob = new Blob([selectedWords.join(', ')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name}_selected-words.csv`;
    a.click();
  };

  return (
    <div className="text-center max-w-xl mx-auto">
      <h2 className=" mb-4">Your Results</h2>
      <div className="space-y-2 mb-6">
        {selectedWords.map((word, i) => (
          <div key={i} className={`p-2 rounded ${i < 7 ? 'bg-green-100 font-bold' : 'bg-gray-50'}`}>
            {word}
          </div>
        ))}
      </div>
      {!hideEmailInput ? (
        <>
          <input className="mb-2 w-full p-2 border rounded" placeholder="Name" />
          <input className="mb-4 w-full p-2 border rounded" placeholder="Email" />
        </>
      ) : null}
      <button className=" --raised" onClick={handleDownload}>
        <span className="">Download Results</span>
      </button>
    </div>
  );
};

export default Result;
