import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function KakaoLogoutRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3001/oauth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('서버 응답이 실패했습니다.');
            }
            return response.json();
        })
        .then((data) => {
            if (data.success) {
                navigate('/success-logout');
            } else {
                console.error('로그아웃 실패:', data.message);
                navigate('/');
            }
        })
        .catch((error) => {
            console.error('오류 발생:', error);
            navigate('/');
        });
    }, [navigate]);

    return null;
}

export default KakaoLogoutRedirect;
