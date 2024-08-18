import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const clearCookies = () => {
  const cookies = document.cookie.split("; ");
  for (let c = 0; c < cookies.length; c++) {
    const d = window.location.hostname.split(".");
    while (d.length > 0) {
      const cookieBase = `${encodeURIComponent(cookies[c].split(";")[0].split("=")[0])}=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=${d.join(".")}; path=`;
      const p = window.location.pathname.split('/');
      document.cookie = `${cookieBase}/`;
      while (p.length > 0) {
        document.cookie = cookieBase + p.join('/');
        p.pop();
      }
      d.shift();
    }
  }
};

const Main = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const handleLogout = () => {
    // 로컬 스토리지에서 토큰 제거
    localStorage.clear();
    sessionStorage.clear();
    clearCookies();
    // 카카오 로그아웃 URL 생성
    const kakaoLogoutUrl = `https://kauth.kakao.com/oauth/logout?client_id=${process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY}&logout_redirect_uri=http://localhost:3000/oauth_logout`;
    
    // 카카오 로그아웃 페이지로 리다이렉트
    window.location.href = kakaoLogoutUrl;
  };

  const goToChatbot = () => {
    const userId = sessionStorage.getItem('userId');
    navigate('/chatbot', { state: { userId } }); // 챗봇 페이지로 이동
  };

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');  // 로그인 후 전달받은 userId

    if (userId) {
      fetch(`http://localhost:3001/api/user/${userId}`)
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            setUserData(data.user);
          } else {
            alert('사용자 정보를 가져오는 데 실패했습니다.');
          }
        })
        .catch(error => {
          console.error('오류 발생:', error);
        });
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>메인화면 입니다만</h1>
      <h2>안녕하세요, {userData.nickname}님!</h2>
      <img
        src={userData.profile_image_url || '/images/person.png'} // 프로필 이미지가 없으면 기본 이미지 사용
        alt="프로필 이미지"
        style={{ width: '100px', height: '100px', borderRadius: '50%' }}
      />
      <button onClick={handleLogout} style={{ marginTop: '20px' }}>
        로그아웃
      </button>

      <button onClick={goToChatbot} style={{ marginTop: '20px' }}>
        대화 시작하기
      </button>
    </div>
  );
};

export default Main;
