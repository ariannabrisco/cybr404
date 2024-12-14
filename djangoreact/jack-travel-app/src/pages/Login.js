import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (window.localStorage.getItem("username")) {
    window.localStorage.clear();
    window.location.reload();
  }

  const currentHostname = window.location.hostname;
  let apiURL = 'https://jacktravel.org:8000/api/users/';
  // COMMENTED OUT DUE TO ERROR ON ARIANNA MAC 
  // if (currentHostname === "localhost" || currentHostname === "127.0.0.1") {
  //   apiURL = 'http://localhost/api/users/';
  // }

  {/* Sign Up Check if Existing Function */}
  const sendUserSignUp = async (username, password) => {
    const response = await fetch(`${apiURL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.trim(),
        password: password.trim(),
      }),
    });

    if (response.ok) {
      alert("Sign up successful! Please log in.");
    } else {
      const errorData = await response.json();
      if (errorData.detail) {
        alert("Username already exists. Please choose a different username.");
      } else {
        alert("An error occurred during sign up. Please try again.");
      }
    }
  };

  {/* Login Check if Correct Function */}
  const fetchUserLogin = async (username, password) => {
    const response = await fetch(`${apiURL}${username.trim()}/`);
    const userData = await response.json();

    if (userData.username === username && userData.password === password) {
      return true;
    } else {
      alert("Invalid username or password. Click Sign Up to create an account.");
      return false;  // catch typos and no account exists
    }
  };

  {/* Login Event Function */}
  const executeLogin = (event) => {
    event.preventDefault();
    if (username === '' || password === '') {
      alert('Please enter username and password!');  // if no info entered popup loop
      return;
    }
    fetchUserLogin(username, password).then((authenticated) => {
      if (authenticated) {
        window.localStorage.setItem("username", username);  // local storage for nav bar Hello message
        window.location.href = "/";
      }
    });
  };

  {/* Sign Up Event Function */}
  const executeSignUp = (event) => {
    event.preventDefault();
    if (username === '' || password === '') {
      alert('Please enter username and password!');  // if no info entered popup loop
      return;
    }
    sendUserSignUp(username, password);  // send to check and have user login if done correctly
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="App-header">
        <h1>Login / Sign Up</h1>
      </header>
      {/* Fields & Button */}
      <form style={{ maxWidth: '400px', margin: 'auto' }}>
        {/* Username Form */}
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '8px' }}>
            Username
          </label>
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

        {/* Password Form */}
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '8px' }}>
            Password
          </label>
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
          onClick={executeLogin}
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
            marginBottom: '10px',
          }}
        >
          Login
        </button>

        {/* Sign Up Button */}
        <button
        type="submit"
          onClick={executeSignUp}  // only change from login button
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
