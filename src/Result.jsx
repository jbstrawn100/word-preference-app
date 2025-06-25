
import React from 'react';

const Result = ({ selectedWords }) => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-4">Your Top Selected Words</h2>
      <ul className="bg-white shadow rounded p-4 mb-6 max-w-md mx-auto space-y-2 text-left">
        {selectedWords.map((word, index) => (
          <li
            key={index}
            className={
              index < 7
                ? 'p-2 border-b last:border-none bg-green-100 font-semibold'
                : 'p-2 border-b last:border-none'
            }
          >
            {word}
          </li>
        ))}
      </ul>
      <a
        href={generateCSV(selectedWords)}
        download="selected-words.csv"
        className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Download Results
      </a>
    </div>
  );
};

const generateCSV = (words) => {
  const csvContent = 'data:text/csv;charset=utf-8,' + words.join(',\\n');
  return encodeURI(csvContent);
};

export default Result;

