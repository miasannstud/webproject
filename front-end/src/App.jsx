import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import DashPage from './pages/dashboard/DashPage';
import ArtifactApp from './pages/createStudy/createStudy';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashPage />} />
        {/* <Route path="/edit" element={<EditPage />}/> */}
        {/* <Route path="/results" element={<ResultsPage />}/> */}
        <Route path="/createStudy" element={<ArtifactApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;