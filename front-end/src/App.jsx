import {Route, Routes, Navigate} from 'react-router-dom';
import './App.css'
import DashPage from './pages/dashboard/DashPage';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<DashPage />}/>
        {/* <Route path="/edit" element={<EditPage />}/> */}
        {/* <Route path="/results" element={<ResultsPage />}/> */}
      </Routes>
    </>
  )
}

export default App
