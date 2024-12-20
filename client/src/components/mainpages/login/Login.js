import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './login.css';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/user/login', { ...user });
      localStorage.setItem('firstLogin', true);
      window.location.href = '/';
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="login-page">

      {/* Main Content */}
      <div className="login-container">
        <h2 className="form-title">
          <span>Login</span> Account
        </h2>
        <form onSubmit={loginSubmit} className="login-form">
          <input
            type="email"
            name="email"
            required
            placeholder="Username"
            value={user.email}
            onChange={onChangeInput}
          />
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            value={user.password}
            onChange={onChangeInput}
          />
          <button type="submit">LOG IN</button>
        </form>

        <div className="social-links">
          <Link to="#"><i className="fab fa-facebook-f"></i></Link>
          <Link to="#"><i className="fab fa-twitter"></i></Link>
        </div>

        <div className="signup-link">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-contact">
          <p>📍VIT Bhopal University, Sehore</p>
          <p>📞 (+91) 999-999-9999</p>
          <p>✉️ delivosup@gmail.com</p>
        </div>
        
        <div className="footer-social">
          <div className="social-circle"></div>
          <div className="social-circle"></div>
          <div className="social-circle"></div>
          <div className="social-circle"></div>
        </div>
        
        <div className="footer-copyright">
          Copyright © 2024 | All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Login;

