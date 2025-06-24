
const WelcomeScreen = ({ onStart }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (!name || !email) {
      alert('Please enter both name and email.');
      return;
    }

    // Send to Google Sheet
    fetch('https://script.google.com/macros/s/AKfycbx24MLWZAOp6tSpHBEovq9irvUib8tRRsKYz6csLyOKiStxNIKjGc3vPak5Drol6PSi6g/exec', {
      method: 'POST',
      body: JSON.stringify({ name, email, started: true }),
      headers: { 'Content-Type': 'application/json' },
    });

    onStart(name, email); // ✅ pass both values
  };

  return (
    <div className="text-center p-4">
      <h1 className="text-3xl font-bold mb-4">Brand Characteristics Exercise</h1>
      <input className="border p-2 mb-2 w-full max-w-sm" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="border p-2 mb-4 w-full max-w-sm" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleSubmit} className="bg-blue-600 text-white px-6 py-2 rounded">Let's Get Started</button>
    </div>
  );
};
