import React, { Fragment, useState } from 'react';
import '../SignIn/SignIn.css'

const Register = ({ onRouteChange, loadUser, host }) => {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userName, setUserName] = useState("");

    const onEmailChange = event => {
        setUserEmail(event.target.value);
    }

    const onPasswordChange = event => {
        setUserPassword(event.target.value);
    }

    const onNameChange = event => {
        setUserName(event.target.value);
    }

    const sendCredentials = () => {
        fetch(`${host}/register`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: userName,
                email: userEmail,
                password: userPassword
            })
        })
        .then(response=> response.json())
        .then( user => {
            if(user){
                loadUser(user);
                onRouteChange('home');
            }
        });
    }
    return (
        <Fragment>
            <div className="sign-in-form">
                <h2>Register</h2>
                <label htmlFor="name">Name</label>
                <input onChange={onNameChange} type="text" id="name"/>
                <label htmlFor="email">Email</label>
                <input onChange={onEmailChange} id="email" type="email" />
                <label htmlFor="password">Password</label>
                <input onChange={onPasswordChange} id="password" type="password" />
                <button className="submit" onClick={sendCredentials}>Register</button>
            </div>
        </Fragment>
    )
}

export default Register;