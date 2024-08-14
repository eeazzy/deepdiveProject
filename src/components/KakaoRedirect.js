import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function KakaoRedirect() {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code);

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
        console.log(data);
        // 여기에 로그인 성공 시 처리할 로직 추가
        // 예시:
        // navigate("/dashboard"); // 대시보드나 다른 페이지로 리디렉션
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
