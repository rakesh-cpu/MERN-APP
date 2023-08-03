import { Form } from 'antd';
import React from 'react'
import '../App.css';

function SignUp() {
  return (
    <div className='SignUp-container'>
        <div className="container">
          <h1 className='signup-data'>Hello signup</h1>
          <Form className='form'>
            <h1>Sign Up</h1>
            <p>username</p>
            <input type="text" placeholder="Enter Username" name="username" required />
            <p>email</p>
            <input type="text" placeholder="Enter Email" name="email" required />
            <p>password</p>
            <input type="password" placeholder="Enter Password" name="password" required />
            <p>confirm password</p>
            <input type="password" placeholder="Enter Password" name="password" required />
            <button type="submit">Sign Up</button>
            <p>Already have an account? <a href="/signin">Sign In</a>.</p>
          </Form>

        </div>
    </div>
  )
}

export default SignUp;