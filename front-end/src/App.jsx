import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginPage from './pages/auth/LoginPage'
import Navbar from './components/shared/navbar/Navbar';
import DashPage from './pages/dashboard/DashPage';
import ResultsPage from './pages/results/ResultsPage';
import CreateStudy from './pages/createStudy/CreateStudy';
import ParticipantPage from './pages/participant/ParticipantPage'

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<LoginPage />} />
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