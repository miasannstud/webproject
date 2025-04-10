import './App.css'
import { useState } from 'react'
import { BrowserRouter, Router, Routes, Route} from 'react-router-dom'

// Components
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import Navbar from './components/shared/navbar/Navbar';

// Pages
import ArtifactApp from './pages/createStudy/createStudy';
import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'
import DashPage from './pages/dashboard/DashPage';
import ResultsPage from './pages/results/ResultsPage';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* <Route path="/edit/:studyId" element={<EditPage />}/> */}

          <Route path="/dashboard" element={<ProtectedRoutes> <DashPage /> </ProtectedRoutes>}/>
          <Route path="/results/:studyId" element={<ProtectedRoutes> <ResultsPage /> </ProtectedRoutes>} />
          <Route path="/createStudy" element={<ProtectedRoutes> <ArtifactApp /> </ProtectedRoutes>} />
      </Routes>
      </BrowserRouter>
  );
}

export default App;