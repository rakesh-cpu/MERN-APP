import { Form } from 'antd';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import '../App.css';

function SignUp(props) {
    const [form, setForm] = useState({});

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        // console.log(form);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        const response = await fetch("http://localhost:5000/signup", {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log(response.status);
        const data = await response.json();
        

        if (response.ok) {
            props.history.push("./Homepage.jsx");
            console.log("form submited successfuly")
        }
    };

    return (
        <div className='SignUp-container'>
            <div className="container">
                <h1 className='signup-data'>Welcome,</h1>
                <Form className='form' onSubmit={handleSubmit} onSubmitCapture={handleSubmit}>
                    <h1>Sign Up</h1>
                    <p>username</p>
                    <input type="text" placeholder="Enter Username" name="username" onChange={handleForm} required />
                    <p>email</p>
                    <input type="text" placeholder="Enter Email" name="email" onChange={handleForm} required />
                    <p>password</p>
                    <input type="password" placeholder="Enter Password" name="password" onChange={handleForm} required />
                    <p>confirm password</p>
                    <input type="password" placeholder="Enter Password" name="cpassword" onChange={handleForm} required />
                    <button type="submit" onClick={()=>props.history.push('/Homepage')}>Sign Up</button>
                    <p>Already have an account? <a href="/signin">Sign In</a>.</p>
                </Form>
            </div>
        </div>
    );
}

export default withRouter(SignUp); // Wrap the component with withRouter
