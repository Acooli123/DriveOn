import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Start from './pages/Start.jsx';
import Home from './pages/Start.jsx';
import UserLogin from './pages/UserLogin.jsx';
import UserSignup from './pages/UserSignup.jsx';
import CaptainLogin from './pages/CaptainLogin.jsx';
import CaptainSignup from './pages/CaptainSignup.jsx';
import UserDataCtext from './context/userContext.jsx';
import { useContext } from 'react';

const App = () => {
  const ans = useContext(UserDataCtext);
  console.log(ans);
  
  return (
    <div >
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
      </Routes>
    </div>
  )
}

export default App
