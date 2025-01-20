
'use client';
import { useState } from 'react';

const MagicLinkForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

 
  const generateToken = () => {
    return Math.random().toString(36).substring(2, 15); 
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);
    setMessage('');

    const token = generateToken();  

    try {
     
      const response = await fetch('/api/auth/magicLink', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          magicLink: `http://localhost:3000/api/auth/verifyMagicLink?token=${token}`, 
        
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Magic link has been sent to your email!');
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage('An error occurred while sending the magic link.');
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Sign in with Magic Link</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Magic Link'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default MagicLinkForm;
