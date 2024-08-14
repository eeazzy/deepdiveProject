import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function KakaoRedirect() {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  useEffect(() => {
    fetch(`http://localhost:3001/oauth/kakao?code=${code}`, {
      method: "POST",
      headers: headers,
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('서버 응답이 실패했습니다.');
      }
      return response.json();
    })
    .then((data) => {
      if (data.success) {
        // 로그인 성공 시 사용자 정보를 넘겨주며 메인 화면으로 이동
        navigate('/main', { state: { nickname: data.nickname, profileImageUrl: data.profile_image_url } });
      } else {
        // 로그인 실패 시 로그인 화면으로 이동
        alert('로그인 실패: ' + data.message);
        navigate('/');
      }
    })
    .catch((error) => {
      console.error("오류 발생:", error);
      // 로그인 실패 시 로그인 화면으로 이동
      navigate('/');
    });
}, [code, navigate]);

return null; // 화면에 아무것도 렌더링하지 않음
}

export default KakaoRedirect;