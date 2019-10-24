import React, { Fragment } from 'react';
import "./PersonRecognition.css";

const PersonRecognition = ( { url } ) => {
    return(
            <Fragment>
                { url.length? <img src={url}
                    alt="pretty fucking cool" 
                    className="center image"
                     /> : <div></div> }
            </Fragment>
    );
}

export default PersonRecognition;