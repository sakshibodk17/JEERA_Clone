import {BrowserRouter as Router , Routes, Route} from 'react-router-dom';
import './App.css'
import Login from './components/Login'
import Register from './components/Registration'
import ForgotPass from './components/ForgotPass';

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/forgotpassword" element={<ForgotPass/>}/>
        
      </Routes>
   
    </Router>
    
     
   
  );
}

export default App
