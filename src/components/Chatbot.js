import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Chatbot.css';

const Chatbot = () => {

    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // 챗봇에 처음 들어왔을 때 환영 메시지를 추가
        const welcomeMessage = {
          text: "안녕하세요! 원하시는 시/자치구를 입력하시고 [식당, 병원, 문화시설] 중에 하나를 입력하시면 해당 위치 근처의 장소들을 알려드립니다! 입력 형식에 맞게 입력해 주세요! 예시 : 서울시 성북구 식당",
          sender: 'server'
        };
        setMessages([welcomeMessage]);
      }, []);

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    const handleSendMessage = () => {
        if (userInput.trim() !== '') {
            // 사용자 입력과 서버 응답을 한 번에 처리
            const userMessage = { text: userInput, sender: 'user' };
            const errorMessage = {
              text: "입력형식이 잘못되었습니다",
              sender: 'server'
            };
            
            setMessages((prevMessages) => [...prevMessages, userMessage, errorMessage]);
      
            // 입력 창 비우기
            setUserInput('');
          }
    };

    const handleBackClick = () => {
        navigate('/main'); // 메인 화면으로 이동
    };

    return (
        <div>
            <button className="back-button" onClick={handleBackClick}>
                돌아가기
            </button>
            <h1>챗봇 페이지</h1>
            <div className="chat-container">
                {messages.map((message, index) => (
                <div 
                    key={index} 
                    className={`message ${message.sender}`}
                >
                    <p style={{ margin: 0 }}>{message.text}</p>
                </div>
                ))}
            </div>
            <div className="input-container">
                <input 
                    type="text" 
                    value={userInput} 
                    onChange={handleInputChange} 
                    placeholder="메시지를 입력하세요..." 
                />
                <button onClick={handleSendMessage}>
                    전송
                </button>
            </div>
        </div>
    );
};

export default Chatbot;
