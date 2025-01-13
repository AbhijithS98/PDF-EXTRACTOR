import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import Login from './screens/LoginScreen';
import Signup from './screens/RegisterScreen';
import { pdfjs } from 'react-pdf';
import './App.css'


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function App() {

  return (
    <Router>     
      <Header />
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
      <ToastContainer />
    </Router>
  )
}

export default App
