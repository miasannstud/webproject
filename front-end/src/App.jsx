import './App.css'
import React from 'react'
import { useState } from 'react'
import { BrowserRouter, Router, Routes, Route} from 'react-router-dom'
import LoginPage from './pages/auth/loginPage'
import SignupPage from './pages/auth/signupPage'
import Navbar from './components/shared/navbar/Navbar';
import DashPage from './pages/dashboard/DashPage';
import ResultsPage from './pages/results/ResultsPage';
import ArtifactApp from './pages/createStudy/createStudy';


function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/dashboard" element={<DashPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* <Route path="/edit/:studyId" element={<EditPage />}/> */}
        <Route path="/results/:studyId" element={<ResultsPage />} />
        <Route path="/createStudy" element={<ArtifactApp />} />
      </Routes>
      </BrowserRouter>
  );
}

export default App;