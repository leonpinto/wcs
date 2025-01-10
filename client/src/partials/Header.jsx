import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
      <div>

      <Link key="home" to={'/'}>Home</Link>
      <Link key="transfer" to={'/transfer'}>Transfer</Link>
      <Link key="transactions" to={'/transactions'}>Transactions</Link>
      </div>
  )
}
