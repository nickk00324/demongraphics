import React, { Fragment } from 'react';
import './Rank.css';

const Rank = ({ person }) => {
    return(
        <Fragment>
            {person.age !== "-1" ? 
                <header className="center">
                    <p className="main-header">
                        {"according to the robot this is: "}
                    </p>
                    <p className="rank">
                        {`a ${person.age} year old ${person.ethnicity} ${person.gender}`}
                    </p>
                    <p className="subtitle">
                        {"(probably, based on probabilities based on the robot's inputs)"}
                    </p>
                </header> : 
                <header className="center">
                    <p className="subtitle">
                        {"enter a photo url to find out what the robot thinks"}
                    </p>
                </header>
                
            }
            
        </Fragment>
        
    );
}

export default Rank;