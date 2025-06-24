
// Result.jsx
import React, { useState } from 'react';

const Result = ({ selectedWords }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    if (!email) {
      alert('Please enter your email to download the file.');
      return;
    }

    fetch('https://script.google.com/macros/s/AKfycbx24MLWZAOp6tSpHBEovq9irvUib8tRRsKYz6csLyOKiStxNIKjGc3vPak5Drol6PSi6g/exec', {
      method: 'POST',
      body: JSON.stringify({ name, email }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => {
        if (data.result === 'success') {
          const csvContent = 'data:text/csv;charset=utf-8,' + selectedWords.join('\n');
          const encodedUri = encodeURI(csvContent);
          const link = document.createElement('a');
          link.setAttribute('href', encodedUri);
          link.setAttribute('download', `${name || 'user'}_selected-words.csv`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          setDownloaded(true);
        } else {
          alert('Failed to log your submission. Please try again.');
        }
      })
      .catch(error => {
        console.error('Logging failed:', error);
        alert('An error occurred. Please try again later.');
      });
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-6">Your Top Words</h2>

      <ul className="bg-white shadow rounded p-4 mb-6 space-y-1 text-left max-w-md mx-auto">
        {selectedWords.map((word, i) => (
          <li
            key={i}
            className={`p-1 border-b last:border-none ${i < 7 ? 'bg-green-100 font-semibold' : ''}`}
          >
            {word}
          </li>
        ))}
      </ul>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="px-4 py-2 border rounded mb-2 w-full max-w-xs"
      />
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-4 py-2 border rounded mb-4 w-full max-w-xs"
      />

      <button
        onClick={handleDownload}
        className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Download CSV
      </button>

      {downloaded && (
        <p className="mt-4 text-green-600 font-medium">Your download has started. Thank you!</p>
      )}
    </div>
  );
};

export default Result;
