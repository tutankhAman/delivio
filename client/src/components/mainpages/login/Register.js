import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './register.css';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });

  const onChangeInput = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const RegisterSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/user/register', { ...user });
      localStorage.setItem('firstRegister', true);
      window.location.href = '/';
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="register-page">

      {/* Main Content */}
      <div className="register-container">
        <h2 className="form-title">
          <span>Register</span> Account
        </h2>
        <form onSubmit={RegisterSubmit}>
          <input
            type="text"
            name="name"
            required
            placeholder="Name"
            value={user.name}
            onChange={onChangeInput}
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
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
          <button type="submit">SIGN UP</button>
        </form>

        <div className="social-links">
          <Link to="#"><i className="fab fa-facebook-f"></i></Link>
          <Link to="#"><i className="fab fa-twitter"></i></Link>
        </div>

        <div className="login-link">
          Already have an account? <Link to="/login">Login</Link>
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

export default Register;

