import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Main.css';

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
    <div className="container">
      <div className="main-container">
        <div className="dog-image-container">
          <img
            src="/images/eazy.png" // 강아지 이미지 경로
            alt="이지"
            className="dog-image"
          />
        </div>
        <div className='profile-chatbotbtn-container'>
          <div className="profile-container">
            <div className="profile-image-wrapper">
              <img
                src={userData.profile_image_url || '/images/person.png'} // 프로필 이미지가 없으면 기본 이미지 사용
                alt="프로필 이미지"
                className="profile-image"
              />
            </div>
            <div className="user-info">
              <h2>어서오세요 {userData.nickname}님!</h2>
            </div>
          </div>
          <button className="chat-button" onClick={goToChatbot}>
            대화 시작하기
          </button>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default Main;
