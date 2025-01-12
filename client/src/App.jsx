import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from './partials/Header'
import Footer from './partials/Footer'

import Home from './pages/Home'
import Transfer from './pages/Transfer'
import Transactions from './pages/Transactions'

import './assets/styles/styles.css'

function App() {

  return (
    <>

      <BrowserRouter>

        <Header/>
    
        <div className="content">

          <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/transfer" element={<Transfer />} />

            <Route path="/transactions" element={<Transactions />} />

          </Routes>


        </div>

        <Footer/>
      
      </BrowserRouter>

    </>
  )
}

export default App
