// import React from 'react'
// import { Link } from 'react-router-dom'

// export default function Header() {
//   return (
//       <nav className='nav'>

//         <div className="logo">

//           <h1>

//             BankFrame

//           </h1>

//         </div>

//         <div className="links">

//           <Link to="/">Home</Link>
//           <Link key="transfer" to={'/transfer'}>Transfer</Link>
//           <Link key="transactions" to={'/transactions'}>Transactions</Link>
//           <Link key="auth" to={'/auth'}>Login/Sign Up</Link>
          
//         </div>

//       </nav>
//   )
// }

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const updateUser = () => {
      console.log("🟡 Checking localStorage for user...");
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          console.log("🟢 User found in localStorage:", parsedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error("🔴 Error parsing user data:", error);
          setUser(null);
        }
      } else {
        console.log("🔴 No user found in localStorage");
        setUser(null);
      }
    };

    updateUser(); // Load user on mount

    // ✅ Detect user login/logout updates
    console.log("🟢 Adding event listener for 'userUpdated'");
    window.addEventListener("userUpdated", updateUser);

    return () => {
      console.log("🔴 Removing event listener for 'userUpdated'");
      window.removeEventListener("userUpdated", updateUser);
    };
  }, []);

  const handleLogout = () => {
    console.log("🚀 Logging out user...");
    localStorage.removeItem('user'); // Clear user session
    setUser(null); // Reset state immediately
    navigate('/auth'); // Redirect to login page
    console.log("🚀 Dispatching 'userUpdated' event");
    window.dispatchEvent(new Event('userUpdated'));
  };

  return (
    <nav className='nav'>
      <div className="logo">
        <h1>BankFrame</h1>
      </div>

      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/transfer">Transfer</Link>
        <Link to="/transactions">Transactions</Link>

        {user ? (
          <>
            <span className="username">Hello, {user.name}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/auth">Login/Sign Up</Link>
        )}
      </div>
    </nav>
  );
}

