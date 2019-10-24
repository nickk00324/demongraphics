import React from 'react';
import './Navigation.css';

const Navigation = ( { onRouteChange, isSignedIn, logOut }) => {
   
    return(
        isSignedIn ? 
        <nav>
            <p className="link" onClick={logOut}>
                Sign Out
            </p>
        </nav> 
        :
        <nav>
            <p className="link" onClick={() => onRouteChange('signIn')}>Sign In</p>
            <p className="link" onClick={() => onRouteChange('register')}>Register</p>
        </nav> 
    )
    

        
}

export default Navigation;