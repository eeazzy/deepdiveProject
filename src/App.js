import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import KakaoRedirect from "./components/KakaoRedirect";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/oauth" element={<KakaoRedirect />} />
      </Routes>
    </Router>
  );
}

export default App;
