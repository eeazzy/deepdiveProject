import React from 'react';

const Login = () => {
  const handleLogin = () => {
    //TODO 카카오 로그인 로직
    console.log("Kakao Login button clicked");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>마실 나갈 땐? 마실댕</h1>
      <button style={styles.button} onClick={handleLogin}>
        Login with Kakao
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f7f7f7',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#ffeb00',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Login;
