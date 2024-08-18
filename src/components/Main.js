import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const handleLogout = () => {
    navigate('/oauth_logout');
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
