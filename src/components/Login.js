import React from 'react';
import KakaoLogin from "react-kakao-login";

const K_REST_API_KEY = process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY;
const K_REDIRECT_URI = `http://localhost:3000/oauth`; // Redirect URI
const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${K_REDIRECT_URI}&response_type=code`;


const Login = () => {

  const handleKakaoLogin = () => {
    window.location.href = kakaoURL; // 카카오 로그인 페이지로 이동
  };

  return (
    <div>
      <button onClick={handleKakaoLogin} className="KakaoButton">Login with Kakao</button>
    </div>
  );
};
  
export default Login;
