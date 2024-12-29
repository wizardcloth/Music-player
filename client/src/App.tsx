import './App.css'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/home/homepage.tsx';
import Authcallback from './pages/authCallback/authCallback.tsx';
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/authcallback"} />} />
        <Route path="/authcallback" element={<Authcallback />} />
      </Routes>
    </>
  )
}

export default App
