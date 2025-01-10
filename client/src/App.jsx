import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from './partials/Header'
import Footer from './partials/Footer'

import Home from './pages/Home'
import Transfer from './pages/Transfer'
import Transactions from './pages/Transactions'

function App() {

  return (
    <>

      <BrowserRouter>

        <Header/>
      
        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/transfer" element={<Transfer />} />

          <Route path="/transactions" element={<Transactions />} />

        </Routes>

        <Footer/>
      
      </BrowserRouter>

    </>
  )
}

export default App
