import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <img
        src="/images/kakao_login_medium_narrow.png"
        alt="Kakao Login"
        onClick={handleKakaoLogin}
        style={{ cursor: 'pointer' }}
      />
    </div>
  );
};
  
export default Login;
