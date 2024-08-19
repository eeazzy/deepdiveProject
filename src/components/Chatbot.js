import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Chatbot.css';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const userId = location.state?.userId;
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (!userId) {
            navigate('/'); // userId가 없으면 로그인 페이지로 리다이렉트
            return;
        }
        
        // 컴포넌트가 로드될 때 사용자 데이터와 서버에서 대화 기록을 가져옴
        fetchUserData();
        fetchChatHistory();
    }, [userId, navigate]);

    useEffect(() => {
        // 메시지가 업데이트될 때마다 스크롤을 맨 아래로 이동
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]); // messages가 변경될 때마다 실행

    const fetchUserData = () => {
        fetch(`http://localhost:3001/api/user/${userId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setUserData(data.user);
                } else {
                    console.error('Failed to load user data:', data.message);
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    };

    const fetchChatHistory = () => {
        fetch(`http://localhost:3001/chat/${userId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const chatMessages = data.chatHistory.map(entry => {
                        let parsedMessage;
                        try {
                            parsedMessage = JSON.parse(entry.message);
                        } catch (e) {
                            parsedMessage = entry.message;
                        }

                        return {
                            text: parsedMessage,
                            sender: entry.sender === 'user' ? 'user' : 'server'
                        };
                    });
                    setMessages(chatMessages);
                } else {
                    console.error('Failed to load chat history:', data.message);
                }
            })
            .catch(error => {
                console.error('Error fetching chat history:', error);
            });
    };

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    const handleSendMessage = () => {
        if (userInput.trim() !== '') {
            const userMessage = { text: userInput, sender: 'user' };
            setMessages(prevMessages => [...prevMessages, userMessage]);

            // 서버로 메시지 전송
            fetch(`http://localhost:3001/chat/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userInput }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        let botMessages;
    
                        try {
                            botMessages = JSON.parse(data.messages[1].message);
                        } catch (e) {
                            botMessages = data.messages[1].message;
                        }
    
                        const botMessageObj = {
                            text: botMessages,
                            sender: 'server',
                        };
    
                        setMessages(prevMessages => [...prevMessages, botMessageObj]);
                    } else {
                        console.error('Error from server:', data.message);
                    }
                })
                .catch(error => {
                    console.error('Error sending message:', error);
                });

            // 입력창 비우기
            setUserInput('');
        }
    };

    const handleBackClick = () => {
        navigate('/main'); // 메인 화면으로 이동
    };

    const handleResetChat = () => {
        fetch(`http://localhost:3001/chat/${userId}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                fetchChatHistory(); // 초기화 후 대화 기록 다시 로드
            } else {
                console.error('Failed to reset chat history:', data.message);
            }
        })
        .catch(error => {
            console.error('Error resetting chat history:', error);
        });
    };

    return (
        <div>
            <button className="back-button" onClick={handleBackClick}>
                돌아가기
            </button>
            <button className="reset-button" onClick={handleResetChat}>
                초기화
            </button>
            <div className="chat-container" ref={chatContainerRef}>
                {messages.map((message, index) => (
                <div 
                    key={index} 
                    className={`message ${message.sender}`}
                >
                    {message.sender === 'user' && userData && (
                        <div className="user-profile">
                            <img 
                                src={userData.profile_image_url || '/images/person.png'} 
                                alt="프로필 이미지" 
                                className="profile-image"
                            />
                            <p className="user-nickname">{userData.nickname}<a>님</a></p>
                        </div>
                    )}
                    {Array.isArray(message.text) ? (message.text.map((item, idx) => (
                <div key={idx}>
                    <p>{item.name}</p>
                    <p>{item.address}</p>
                </div>
            ))
        ) : (
            typeof message.text === 'object' ? (
                <div>
                    <p>{message.text.name}</p>
                    <p>{message.text.address}</p>
                </div>
            ) : (
                <p style={{ margin: 0 }}>{message.text}</p>
            )
        )}
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
