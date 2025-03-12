import React, { useState } from 'react';

// Helper function to handle form submission
const handleSubmit = (e, formType, credentials) => {
  e.preventDefault();
  if (!credentials.email || !credentials.password || (!isLogin && !credentials.fullName)) {
    alert('Please fill out all required fields');
    return;
  }

  console.log(`${formType} credentials:`, credentials);
  // Implement actual login/signup logic, e.g., API calls
};

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [credentials, setCredentials] = useState({ 
    email: '', 
    password: '', 
    fullName: '', 
    accountBalance: '$' 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Ensure Account Balance input always starts with "$"
    if (name === 'accountBalance') {
      let formattedValue = value.replace(/[^0-9.]/g, ''); // Allow only numbers and decimal
      const decimalCount = (formattedValue.match(/\./g) || []).length;
      if (decimalCount > 1) return; // Prevent multiple decimal points
      formattedValue = `$${formattedValue}`; // Add "$" prefix
      setCredentials((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      setCredentials((prev) => ({ ...prev, [name]: value }));
    }
  };

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
    setCredentials({ email: '', password: '', fullName: '', accountBalance: '$' }); // Reset form
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={(e) => handleSubmit(e, isLogin ? 'Login' : 'Sign Up', credentials)}>
        {/* Email Field */}
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

        {/* Password Field */}
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

        {/* Full Name Field - Only for Sign Up */}
        {!isLogin && (
          <div className="input-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={credentials.fullName}
              onChange={handleInputChange}
              required
            />
          </div>
        )}

        {/* Account Balance Field - Only for Sign Up */}
        {!isLogin && (
          <div className="input-group">
            <label htmlFor="accountBalance">Account Balance</label>
            <input
              type="text"
              id="accountBalance"
              name="accountBalance"
              value={credentials.accountBalance}
              onChange={handleInputChange}
              required
            />
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className="submit-btn">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>

      {/* Toggle between Login and Sign Up */}
      <div className="toggle-form">
        <button onClick={toggleForm}>
          {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
