import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'

import Start from './pages/Start.jsx'
import Home from './pages/Home.jsx'
import CaptainHome from './pages/CaptainHome.jsx'
import UserLogin from './pages/UserLogin.jsx'
import UserSignup from './pages/UserSignup.jsx'
import CaptainLogin from './pages/CaptainLogin.jsx'
import CaptainSignup from './pages/CaptainSignup.jsx'
import Riding from './pages/Riding.jsx'
import CaptainRiding from './pages/CaptainRiding.jsx'


import UserProtectedWrapper from './pages/UserProtectedWrapper.jsx'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper.jsx'
import { UserDataContext } from './context/UserDataContext.jsx'

import UserLogout from './pages/UserLogout.jsx'

const App = () => {

  useContext(UserDataContext)
  // console.log(ans)

  return (
    <div>
      <Routes>

        <Route path="/" element={<Start />} />

        <Route 
          path="/home" 
          element={
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>
          } 
        />
        <Route path='/riding' element={ <Riding /> } />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/captain-ride" element={<CaptainRiding />} />

        <Route path="/users/logout" 
          element={
            <UserProtectedWrapper>
              <UserLogout />
            </UserProtectedWrapper>
          }
        />

        <Route 
          path="/captain-home" 
          element={
            <CaptainProtectedWrapper>
              <CaptainHome/>
            </CaptainProtectedWrapper> 
          } 
        />

      </Routes>
    </div>
  )
}

export default App