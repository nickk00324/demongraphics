import React, { Fragment, useState } from 'react';
import './SignIn.css'

const SignIn = ( {onRouteChange, host }) => {
    const [signInEmail, setSignInEmail] = useState("");
    const [signInPassword, setSignInPassword] = useState("");

    const onEmailChange = event => {
        setSignInEmail(event.target.value);
    }

    const onPasswordChange = event => {
        setSignInPassword(event.target.value);
    }

    const sendCredentials = () => {
        fetch(`${host}/login`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword
            })
        })
        .then(response=> response.json())
        .then(data => {
            if(data === 'success'){
                onRouteChange('home');
            } else {
                console.log("NO");
            }
        }) 
        
    }
    return(
        <Fragment>
            <div className="sign-in-form">
                <h2>Sign In</h2>
                <label htmlFor="email">Email</label>  
                <input id="email" type="email" onChange={onEmailChange}/>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" onChange={onPasswordChange}/>
                <button className="submit" onClick={sendCredentials} >Sign In</button>
                <p className="smaller-link" onClick={ () => onRouteChange('register')}>
                    Register
                </p>
            </div>
        </Fragment>
    )
}

export default SignIn;