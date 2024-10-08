import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import KakaoRedirect from "./components/KakaoRedirect";
import KakaoLogoutRedirect from './components/KakaoLogoutRedirect';
import SuccessLogout from './components/SuccessLogout';
import Main from "./components/Main";
import Chatbot from './components/Chatbot';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/oauth" element={<KakaoRedirect />} />
        <Route path="/oauth_logout" element={<KakaoLogoutRedirect />} />
        <Route path="/success-logout" element={<SuccessLogout />} />
        <Route path="/main" element={<Main />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </Router>
  );
}

export default App;
