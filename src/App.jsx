import React, { useEffect }  from 'react'
import { BrowserRouter as Router, Routes, Route,useLocation, Navigate } from 'react-router-dom'
import WelcomePage from './pages/WelcomePage'
import Signup from './pages/Sign-up/Signup'
import Login from './pages/Login'
import SendResetLinkPage from './pages/Reset-Password/SendResetLinkPage'
import ResetPasswordPage from './pages/Reset-Password/ResetPasswordPage'
import SecurityQuestionsPage from './pages/Reset-Password/SecurityQuestionsPage'
import LockedOutPage from './pages/Reset-Password/LockedOutPage'
import SecurityQuestionsPageSignup from './pages/Sign-up/SecurityQuestionsPageSignup'
import ConfirmEmailPage from './pages/Sign-up/ConfirmEmailPage'

function App() {
  // const location = useLocation();
  // useEffect(() => {
  //   const hash = window.location.hash.substring(1);
  //   const params = new URLSearchParams(hash);

  //   const idToken = params.get('id_token');
  //   const accessToken = params.get('access_token');
  //   const expiresIn = parseInt(params.get('expires_in') || '86400', 10);

  //   if (idToken && accessToken) {
  //     const expiryTime = Date.now() + expiresIn * 1000;

  //     localStorage.setItem('id_token', idToken);
  //     localStorage.setItem('access_token', accessToken);
  //     localStorage.setItem('token_expiry', expiryTime.toString());

  //     window.history.replaceState({}, document.title, window.location.pathname);
  //   }
  // }, [location]);
  

  return (
    <Router>
      <div style={styles.app}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<WelcomePage />} />
          <Route path="/sendresetlinkpage" element={<SendResetLinkPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/security-questions" element={<SecurityQuestionsPage />} />
          <Route path="/locked-out" element={<LockedOutPage />} />
          <Route path="/security-questions-signup" element={<SecurityQuestionsPageSignup />} />
          <Route path="/confirm-email" element={<ConfirmEmailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}


const styles = {
  app: {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    fontFamily: 'Arial, sans-serif',
  }
};
export default App