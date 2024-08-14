import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Main = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { nickname, profileImageUrl } = location.state || {}; // 전달된 사용자 정보

  const handleLogout = () => {
    // 로컬 스토리지에서 토큰 제거
    localStorage.removeItem('accessToken');
    // 로그인 화면으로 리다이렉트
    navigate('/');
  };

  return (
    <div>
      <h1>메인화면 입니다만</h1>
      <h2>안녕하세요, {nickname}님!</h2>
      <img
        src={profileImageUrl || '/images/person.png'} // 프로필 이미지가 없으면 기본 이미지 사용
        alt="프로필 이미지"
        style={{ width: '100px', height: '100px', borderRadius: '50%' }}
      />
      <button onClick={handleLogout} style={{ marginTop: '20px' }}>
        로그아웃
      </button>
    </div>
  );
};

export default Main;
