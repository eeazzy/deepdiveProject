import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function KakaoRedirect() {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  console.log('인가 코드:', code);

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  useEffect(() => {
    fetch(`http://your-backend-api.com/oauth/kakao?code=${code}`, {
      method: "POST",
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('백엔드 응답:', data);  // 백엔드에서 받은 응답 출력
        if (data.success) {
          // 로그인 성공 시 처리할 로직 (예: 사용자 정보 저장, 페이지 이동 등)
          navigate('/dashboard');  // 대시보드 페이지로 이동
        } else {
          // 로그인 실패 처리
          alert('로그인 실패: ' + data.message);
        }
      })
      .catch((error) => {
        console.error("오류 발생", error);
      });
  }, [code, navigate]);

  return (
    <div>
      <h1>로그인 중입니다.</h1>
    </div>
  );
}

export default KakaoRedirect;
