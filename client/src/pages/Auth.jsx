// import React, { useState } from 'react';

// // Helper function to handle form submission
// const handleSubmit = (e, formType, credentials) => {
//   e.preventDefault();
//   if (!credentials.email || !credentials.password || (!isLogin && !credentials.fullName)) {
//     alert('Please fill out all required fields');
//     return;
//   }

//   console.log(`${formType} credentials:`, credentials);
//   // Implement actual login/signup logic, e.g., API calls
// };

// const Auth = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [credentials, setCredentials] = useState({ 
//     email: '', 
//     password: '', 
//     fullName: '', 
//     accountBalance: '$' 
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     // Ensure Account Balance input always starts with "$"
//     if (name === 'accountBalance') {
//       let formattedValue = value.replace(/[^0-9.]/g, ''); // Allow only numbers and decimal
//       const decimalCount = (formattedValue.match(/\./g) || []).length;
//       if (decimalCount > 1) return; // Prevent multiple decimal points
//       formattedValue = `$${formattedValue}`; // Add "$" prefix
//       setCredentials((prev) => ({ ...prev, [name]: formattedValue }));
//     } else {
//       setCredentials((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const toggleForm = () => {
//     setIsLogin((prev) => !prev);
//     setCredentials({ email: '', password: '', fullName: '', accountBalance: '$' }); // Reset form
//   };

//   return (
//     <div className="auth-container">
//       <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
//       <form onSubmit={(e) => handleSubmit(e, isLogin ? 'Login' : 'Sign Up', credentials)}>
//         {/* Email Field */}
//         <div className="input-group">
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={credentials.email}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         {/* Password Field */}
//         <div className="input-group">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={credentials.password}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         {/* Full Name Field - Only for Sign Up */}
//         {!isLogin && (
//           <div className="input-group">
//             <label htmlFor="fullName">Full Name</label>
//             <input
//               type="text"
//               id="fullName"
//               name="fullName"
//               value={credentials.fullName}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//         )}

//         {/* Account Balance Field - Only for Sign Up */}
//         {!isLogin && (
//           <div className="input-group">
//             <label htmlFor="accountBalance">Account Balance</label>
//             <input
//               type="text"
//               id="accountBalance"
//               name="accountBalance"
//               value={credentials.accountBalance}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//         )}

//         {/* Submit Button */}
//         <button type="submit" className="submit-btn">
//           {isLogin ? 'Login' : 'Sign Up'}
//         </button>
//       </form>

//       {/* Toggle between Login and Sign Up */}
//       <div className="toggle-form">
//         <button onClick={toggleForm}>
//           {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Auth;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3000/api'; // Update with your backend URL

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [credentials, setCredentials] = useState({ 
    email: '', 
    password: '', 
    fullName: '', 
    accountBalance: '' 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'accountBalance') {
      let formattedValue = value.replace(/[^0-9.]/g, ''); 
      formattedValue = `$${formattedValue}`;
      setCredentials((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      setCredentials((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? '/login' : '/register';
      const payload = isLogin
        ? { email: credentials.email, password: credentials.password }
        : {
            name: credentials.fullName,
            email: credentials.email,
            password: credentials.password,
            balance: parseFloat(credentials.accountBalance.replace('$', '')) || 0,
          };

      console.log(`🔵 Sending request to ${API_URL}${endpoint} with payload:`, payload);

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setLoading(false);
      console.log('🟢 API Response:', data);

      if (!data.success) {
        console.error('🔴 Authentication Failed:', data.message);
        setError(data.message);
        return;
      }

      // ✅ Store name & email from backend response
      const userData = {
        name: data.name, // ✅ Store full name
        email: data.email,
      };

      console.log('✅ Storing user in localStorage:', userData);
      localStorage.setItem('user', JSON.stringify(userData));

      // ✅ Notify Header.jsx that user data changed
      console.log('🚀 Dispatching "userUpdated" event');
      window.dispatchEvent(new Event('userUpdated'));

      navigate('/');

    } catch (error) {
      console.error('❌ Auth Error:', error);
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
    setCredentials({ email: '', password: '', fullName: '', accountBalance: '' });
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={credentials.email} onChange={handleInputChange} required />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={credentials.password} onChange={handleInputChange} required />
        </div>

        {!isLogin && (
          <>
            <div className="input-group">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" id="fullName" name="fullName" value={credentials.fullName} onChange={handleInputChange} required />
            </div>

            <div className="input-group">
              <label htmlFor="accountBalance">Account Balance</label>
              <input type="text" id="accountBalance" name="accountBalance" value={credentials.accountBalance} onChange={handleInputChange} required />
            </div>
          </>
        )}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
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

