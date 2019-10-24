import React, { Fragment } from 'react';
import Tilt from 'react-tilt';
import "./Logo.css";

const Logo = () => {
    return(
        <Fragment>
            <div className="logo">
                <Tilt className="Tilt" options={{ max: 25 }} style={{ height: 150, width: 250 }} >
                    <div className="Tilt-inner">
                        <img alt="cool logo" src="https://library.kissclipart.com/20180829/vew/kissclipart-generic-logo-png-clipart-logo-brand-organization-be5c1b13e9a7c0b3.jpg"
                            style={{ width: "250px" }} />
                    </div>
                </Tilt>
            </div>
            
        </Fragment>
    )
}

export default Logo;