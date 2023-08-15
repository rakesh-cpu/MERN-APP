import React from 'react';
import { useState } from 'react';
import { Routes, Route, Link ,useNavigate } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';

import { Exchanges, Homepage, News, Cryptocurrencies, CryptoDetails, Navbar } from './components';
import './App.css';
import Login from './components/Login/Login';
import SignUp from './components/Signup/Signup';
import Profile from './components/Profile';

const user = localStorage.getItem("token");

function App() {

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!user); 

  const handleLogout = () => {
    
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/signin'); 
  };
  return (
    <div className="app">
      <div className="navbar">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      </div>
      {/* {user && <Route path="/" element={<Homepage />} />} */}
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
              <Route path="/crypto/:coinId" element={<CryptoDetails />} />
              <Route path="/news" element={<News />} />
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/signin" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </div>
        </Layout>

        <div className="footer-containter">
          <div className="footer">
            <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>
              Copyright © 2023{' '}
              <Link to="/">RAKESH DONTULA CO.</Link>
              <br />
              All Rights Reserved.
            </Typography.Title>
            <Space>
              <Link to="/">Home</Link>
              <Link to="/exchanges">Exchanges</Link>
              <Link to="/news">News</Link>
            </Space>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
