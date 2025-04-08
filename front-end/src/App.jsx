import {Route, Routes, Navigate} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Navbar from './components/shared/navbar/Navbar';
import DashPage from './pages/dashboard/DashPage';
import ResultsPage from './pages/results/ResultsPage';

function App() {

  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<DashPage />} />
        {/* <Route path="/edit/:studyId" element={<EditPage />}/> */}
        <Route path="/results/:studyId" element={<ResultsPage />} />
      </Routes>
      </BrowserRouter>
  )
}

export default App
