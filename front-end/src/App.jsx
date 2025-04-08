import './App.css'
import React from 'react'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoginPage from './pages/auth/loginPage'
import HomePage from './pages/home/homePage'

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App
