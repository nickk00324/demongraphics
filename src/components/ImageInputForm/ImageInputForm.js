import React from 'react';
import "./ImageInputForm.css";

const ImageInputForm = ({onInputChange, onSubmit}) => {
    return(
        <div className="center">
            <input type="text" onChange={onInputChange}/>
            <button className="submit" onClick={onSubmit}> Do it</button>
        </div>
    );
}

export default ImageInputForm;