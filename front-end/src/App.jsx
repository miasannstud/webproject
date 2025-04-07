import { BrowserRouter as Routes, Route} from 'react-router-dom';
import './App.css'
import DashPage from './pages/dashboard/DashPage';
import ArtifactApp from './pages/createStudy/createStudy';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashPage />}/>
        {/* <Route path="/edit" element={<EditPage />}/> */}
        {/* <Route path="/results" element={<ResultsPage />}/> */}
        <Route path="/createStudy" element={<ArtifactApp />} />
      </Routes>
    </>
  );
}

export default App;