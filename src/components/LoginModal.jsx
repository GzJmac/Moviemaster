import React, { useState } from 'react';

const LoginModal = ({ onClose, onSignIn }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const result = await onSignIn(email, password, isSignUp);
      if (result.error) {
        setError(result.error);
      } else {
        onClose();
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    
    try {
      const result = await onSignIn(null, null, false, true);
      if (result.error) {
        setError(result.error);
      } else {
        onClose();
      }
    } catch (err) {
      setError('Google sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <h2 className="modal-title">
          {isSignUp ? 'Create Account' : 'Sign In'}
        </h2>
        
        <p className="modal-subtitle">
          Sign in to save your preferences and get personalized recommendations across devices
        </p>

        {error && <div className="error-message">{error}</div>}

        <button 
          className="google-signin-btn"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <span className="google-icon">🔐</span>
          Continue with Google
        </button>

        <div className="divider">
          <span>or</span>
        </div>

        <form onSubmit={handleEmailAuth}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="auth-input"
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="auth-input"
            disabled={loading}
          />
          <button 
            type="submit" 
            className="auth-submit-btn"
            disabled={loading}
          >
            {loading ? 'Please wait...' : (isSignUp ? 'Sign Up' : 'Sign In')}
          </button>
        </form>

        <p className="auth-toggle">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <button 
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
            }}
            className="toggle-btn"
            disabled={loading}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>

        <p className="guest-mode">
          <button 
            onClick={onClose}
            className="guest-btn"
            disabled={loading}
          >
            Continue as Guest
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
