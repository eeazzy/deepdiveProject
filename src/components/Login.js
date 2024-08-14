import React from 'react';
import KakaoLogin from "react-kakao-login";

const Login = () => {
    const kakaoClientId = process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY; 
  
    const kakaoOnSuccess = (response) => {
        console.log("로그인 성공:", response);
        const { profile, response: { access_token } } = response;
        console.log('Kakao Profile:', profile);
        console.log('Access Token:', access_token);
        // 로그인 성공 후 인가 코드는 /auth 경로로 리디렉션
    };
  
    const kakaoOnFailure = (error) => {
      console.error("로그인 실패:", error);
    };
  
    return (
        <div>
          <h1>카카오 로그인</h1>
          <KakaoLogin
            token={kakaoClientId}
            onSuccess={kakaoOnSuccess}
            onFail={kakaoOnFailure}
            render={({ onClick }) => (
              <button onClick={onClick}>
                Login with Kakao
              </button>
            )}
          />
        </div>
    );
  };
  
  export default Login;
