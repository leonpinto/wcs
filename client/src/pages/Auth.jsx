import React, { useState } from 'react';

// Helper function to handle form submission
const handleSubmit = (e, formType, credentials) => {
  e.preventDefault();
  if (!credentials.email || !credentials.password) {
    alert('Please fill out all fields');
    return;
  }

  console.log(`${formType} credentials:`, credentials);
  // Implement actual login/signup logic, e.g., API calls
};

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [credentials, setCredentials] = useState({ email: '', password: '', username: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
    setCredentials({ email: '', password: '', username: '' }); // Reset form
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={(e) => handleSubmit(e, isLogin ? 'Login' : 'Sign Up', credentials)}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            required
          />
        </div>

        {!isLogin && (
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
              required
            />
          </div>
        )}

        <button type="submit" className="submit-btn">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>

      <div className="toggle-form">
        <button onClick={toggleForm}>
          {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
