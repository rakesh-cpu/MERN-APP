import React from 'react'
import { useState } from 'react';
import '../App.css';

function SignIn() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const response = await fetch('http://localhost:5000/signin',{
      method:'POST',
      body  : JSON.stringify({username,password}),
      headers : {
        'Content-Type' : 'application/json',
      }
    });
    const data = await response.json();
    if(data.success){
      console.log("success");
    }
    else{
      console.log('error yeah');
    }

  }

  return (
    <div className='Sign'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <p>username</p>
        <input type="text" placeholder="Enter Username" name="username" value={username}  onChange={(e) => setUsername(e.target.value)} required />
        <p>password</p> 
        <input type="password" placeholder="Enter Password" name="password" value={password}  onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Sign In</button>
        <p>Don't have an account? <a href="/signup">Sign Up</a>.</p>
      </form>

    </div>
  )
}

export default SignIn;