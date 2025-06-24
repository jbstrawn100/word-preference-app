
import React, { useState } from 'react';

const WelcomeScreen = ({ onStart }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleStart = () => {
    if (!name || !email) {
      alert('Please enter your name and email to continue.');
      return;
    }

    // ✅ Send data to Google Sheets
    fetch('https://script.google.com/macros/s/AKfycbx24MLWZAOp6tSpHBEovq9irvUib8tRRsKYz6csLyOKiStxNIKjGc3vPak5Drol6PSi6g/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, event: 'started' }),
    }).catch((error) => {
      console.error('Error sending to Google Sheet:', error);
    });

    onStart(); // Proceed to Step 1
  };

  return (
    <div className="text-center px-4">
      <h1 className="text-3xl font-bold mb-4">Brand Characteristics Exercise</h1>
      <p className="mb-4 max-w-md mx-auto text-gray-700">
        The goal of this exercise is to narrow your list of potential attributes so you can better understand who you are as a brand.
      </p>

      <div className="mb-4 max-w-md mx-auto">
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

      <button
        onClick={handleStart}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Let's Get Started
      </button>

      <p className="mt-2 text-xs text-gray-500 max-w-md mx-auto">
        By continuing, you agree to let our team contact you with marketing and update emails.
      </p>
    </div>
  );
};

export default WelcomeScreen;