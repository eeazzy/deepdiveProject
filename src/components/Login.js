import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const K_REST_API_KEY = process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY;
const K_REDIRECT_URI = `http://localhost:3000/oauth`; // Redirect URI
const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${K_REDIRECT_URI}&response_type=code`;


const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // 로컬 스토리지 또는 쿠키에 저장된 토큰을 확인
    const token = localStorage.getItem('accessToken');
    if (token) {
      // 토큰이 존재한다면, 자동으로 메인 화면으로 이동
      navigate('/main');
    }
  }, [navigate]);

  const handleKakaoLogin = () => {
    window.location.href = kakaoURL; // 카카오 로그인 페이지로 이동
  };

  return (
    <div className="login-container">
      <div className="text-container">
        <h1>마실 나갈 땐? 마실댕</h1>
      </div>
      <div className="dog-image-container">
        <img
          src="/images/eazy.png"
          alt="이지"
          className="dog-image"
        />
      </div>
      <img
        src="/images/kakao_login_medium_narrow.png"
        alt="Kakao Login"
        onClick={handleKakaoLogin}
        className="login-button"
      />
    </div>
  );
};
  
export default Login;
