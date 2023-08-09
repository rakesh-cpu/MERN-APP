import React from 'react'
import '../App.css';

function SignIn() {
  return (
    <div className='Sign'>
      <form className='form'>
        <h1>Sign In</h1>
        <p>username</p>
        <input type="text" placeholder="Enter Username" name="username" required />
        <p>password</p>
        <input type="password" placeholder="Enter Password" name="password" required />
        <button type="submit">Sign In</button>
        <p>Don't have an account? <a href="/signup">Sign Up</a>.</p>
      </form>

    </div>
  )
}

export default SignIn;