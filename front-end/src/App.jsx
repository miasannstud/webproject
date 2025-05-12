import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Components
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import Navbar from './components/shared/navbar/Navbar';

// Pages
import CreateStudy from './pages/createStudy/CreateStudy';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import DashPage from './pages/dashboard/DashPage';
import ResultsPage from './pages/results/ResultsPage';
import ParticipantFlow from './pages/participant/ParticipantFlow';
import EditStudy from './pages/dashboard/EditStudy';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/participant/:studyId/*" element={<ParticipantFlow />} />

        <Route path="/dashboard" element={<ProtectedRoutes><Navbar /><DashPage /></ProtectedRoutes>} />
        <Route path="/results/:studyId" element={<ProtectedRoutes> <Navbar /><ResultsPage /> </ProtectedRoutes>} />
        <Route path="/createStudy" element={<ProtectedRoutes> <Navbar /> <CreateStudy /> </ProtectedRoutes>} />
        <Route path="/editStudy/:studyId" element={<ProtectedRoutes> <Navbar />  <EditStudy /> </ProtectedRoutes>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
