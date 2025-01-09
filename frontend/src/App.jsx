import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import HomeScreen from './screens/HomeScreen';
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
      </Routes>
      <ToastContainer />
    </Router>
  )
}

export default App
