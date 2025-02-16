import React, { useState } from 'react';
import axios from 'axios'; // Import Axios library
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import '../../App.css';
import './SignIn.css';

export default function SignIn() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestData = {
      email,
      password,
    };

    try {
      const response = await axios.post('http://localhost:49471/api/login', requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = response.data;

      if (data != null) {
        const { user_id, role_id, first_name } = data;
        const userId = user_id;
        const roleId = role_id;
        const firstName = first_name;

        const isLoggedIn = roleId === 'customer' || roleId === 'sp';

        sessionStorage.setItem('user_id' , userId)
        sessionStorage.setItem('role_id', roleId);
        sessionStorage.setItem('first_name', firstName);
        sessionStorage.setItem('isLoggedIn', isLoggedIn);

        

        if (isLoggedIn) {
          if (role_id === 'customer') {
            history.push('/');
            toast.success('Login successful!');
            window.location.reload()
          } else if (role_id === 'sp') {
            sessionStorage.setItem('user_id', userId);
            history.push(`/HomeSp`);
            toast.success('Login successful!');
            window.location.reload()
          }
        } else {
          toast.error('Login failed. Please check your credentials.');
        }

        console.log('Login Successful:', data);
      }
    } catch (error) {
      history.push('/SignIn');
      toast.error('Login failed. Please check your credentials.');
      console.error('Login Error:', error);
    }
  };

  return (
    <div className="SignIn">
      <div className="wrapper">
        <div className="form-box login">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <span className="icon">
                <ion-icon name="mail"></ion-icon>
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={handleEmailChange}
              /><label>Email</label>
            </div>

            <div className="input-box">
              <span className="icon">
                <ion-icon name="lock-closed"></ion-icon>
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={handlePasswordChange}
              /><label>Password</label>
            </div>

            <div className="remember-forgot">
              <label>
                <input type="checkbox" style={{ width: '20px' }} />
                Remember me
              </label>
              <a href="/">Forgot Password?</a>
            </div>

            <button type="submit" className="btn">
              Login
            </button>
          </form>

          <div className="login-register">
            <p>
              Don't have an account? <a href="Register">Register</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
