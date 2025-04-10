import './App.css'
import React from 'react'
import { useState } from 'react'
import { BrowserRouter, Router, Routes, Route} from 'react-router-dom'
import LoginPage from './pages/auth/loginPage'
import Navbar from './components/shared/navbar/Navbar';
import DashPage from './pages/dashboard/DashPage';
import ResultsPage from './pages/results/ResultsPage';
import CreateStudy from './pages/createStudy/createStudy';
import ParticipantPage from './pages/participant/ParticipantPage'
import QuestionsCard from './pages/createStudy/questionCard/QuestionsCard';
import CreateStudy from './pages/createStudy/createStudy';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashPage />} />
<<<<<<<<< Temporary merge branch 1
        <Route path="/" element={<LoginPage />} />
=========
>>>>>>>>> Temporary merge branch 2
        {/* <Route path="/edit/:studyId" element={<EditPage />}/> */}
        <Route path="/results/:studyId" element={<ResultsPage />} />
        <Route path="/createStudy" element={<CreateStudy />} />
        <Route path="/participant/:studyId" element={<ParticipantPage />} />
      </Routes>
      </BrowserRouter>
  );
}

export default App;