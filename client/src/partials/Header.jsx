import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
      <nav className='nav'>

        <div className="logo">

          <h1>

            BankFrame

          </h1>

        </div>

        <div className="links">

          <Link to="/">Home</Link>
          <Link key="transfer" to={'/transfer'}>Transfer</Link>
          <Link key="transactions" to={'/transactions'}>Transactions</Link>
          <Link key="auth" to={'/auth'}>Login/Sign Up</Link>
          
        </div>

      </nav>
  )
}
