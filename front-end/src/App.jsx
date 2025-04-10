import './App.css'
import React from 'react'
import { BrowserRouter, Router, Routes, Route} from 'react-router-dom'
import LoginPage from './pages/auth/loginPage'
import Navbar from './components/shared/navbar/Navbar';
import DashPage from './pages/dashboard/DashPage';
import ResultsPage from './pages/results/ResultsPage';
import CreateStudy from './pages/createStudy/createStudy';
import ParticipantPage from './pages/participant/ParticipantPage'

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/dashboard" element={<DashPage />} />
        <Route path="/" element={<LoginPage />} />
        {/* <Route path="/edit/:studyId" element={<EditPage />}/> */}
        <Route path="/results/:studyId" element={<ResultsPage />} />
        <Route path="/createStudy" element={<CreateStudy />} />
        <Route path="/participant/:studyId" element={<ParticipantPage />} />
      </Routes>
      </BrowserRouter>
  );
}

export default App;