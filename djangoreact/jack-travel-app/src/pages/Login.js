import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const executeLogin = (event) => {
    event.preventDefault(); // Prevent form from refreshing the page
    // *** ADD VERIFICATION HERE ***
    if (username === '' || password === '') {
      alert('Please enter username and password!');
      return;
    }
    alert(`Logged in as ${username}`);  // *** PLACEHOLDER (DATABASE CALL HERE TO DISPLAY FAVORITES?) ***
  };

  return (
    <div className='App'>
    {/* Header */}
    <header className="App-header">
      <h1>Login / Sign Up</h1>
    </header>
    {/* Fields & Button */}
      <form 
      onSubmit={executeLogin} 
      style={{ 
        maxWidth: '400px', 
        margin: 'auto' 
        }}>

        {/* Username */}
        <div 
        style={{ 
          marginBottom: '20px' 
          }}
          >
          <label 
          htmlFor="username" 
          style={{ 
            display: 'block', 
            marginBottom: '8px' 
            }}
            >Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            style={{
              padding: '10px',
              fontSize: '18px',
              width: '100%',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        {/* Password */}
        <div 
        style={{ 
          marginBottom: '20px' 
          }}
          >
          <label htmlFor="password" style={{ display: 'block', marginBottom: '8px' }}>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            style={{
              padding: '10px',
              fontSize: '16px',
              width: '100%',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            fontSize: '18px',
            backgroundColor: '#17a2b8',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            alt: "Login",
            width: '100%',
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
