import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Auth = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const authCode = params.get('code');

    if (authCode) {
      console.log('인가 코드:', authCode);
      // 여기서 백엔드로 인가 코드를 보내거나 추가 처리를 할 수 있습니다.
      // 예시:
      // await axios.post('http://your-backend-api.com/auth/kakao', { code: authCode });
    }
  }, [location]);

  return <div>카카오 인증 중...</div>;
};

export default Auth;
