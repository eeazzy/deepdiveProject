import React from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessLogout = () => {
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate('/'); // 로그인 페이지로 이동
    };

    return (
        <div>
            <h1>성공적으로 로그아웃 되었습니다</h1>
            <button onClick={handleLoginRedirect}>로그인 페이지로 이동</button>
        </div>
    );
};

export default SuccessLogout;
