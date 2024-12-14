import React, { useState, useEffect } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (window.localStorage.getItem("username")) {
    window.localStorage.clear()
    window.location.reload()
}

  const currentHostname = window.location.hostname;
  let apiURL = 'https://jacktravel.org:8000/api/users/'
  // COMMENTED OUT DUE TO ERROR ON ARIANNA MAC 
//  if (currentHostname === "localhost" || currentHostname === "127.0.0.1") {
//    apiURL = 'http://localhost/api/users/'
//  }

  const sendUserLogin = async (username, password) => {
      const response = await fetch(`${apiURL}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              username: `${username}`,
              password: `${password}`,
          })
      })

      if (!response.ok) {
          alert("User already exists")
      }
  }

  const fetchUserLogin = async (username, password) => {
      username = username.trim()
      password = password.trim()
      const response = await fetch(`${apiURL}${username}/`)
      .then( response => {
          return response.json()
      })
      if (response.username === `${username}` && response.password === `${password}`) {
          return true;
      } else {
          alert("Invalid username or password. Click Sign Up to create an account.");
          return false;
      }

  }


  const executeLogin = (event) => {
    event.preventDefault(); // Prevent form from refreshing the page
    // *** ADD VERIFICATION HERE ***
    if (username === '' || password === '') {
      alert('Please enter username and password!');
      return;
    }
    fetchUserLogin(`${username}`, `${password}`)
    .then(authenticated => {
        if (authenticated === true) {
            window.localStorage.setItem("username", username);
            window.location.href = "/"
        }
    })
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

        {/* Sign Up Button */}
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
            alt: "Sign Up",
            width: '100%',
          }}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Login;