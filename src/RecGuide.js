import React from 'react';
import './Quideo.css';

class RecGuide extends React.Component {
    render() {
        const title = "rec guide title"
        const contents = "rec guide contents!!!!"

        return(
            <div classname="question">
                <h3>{title}</h3>
                <p>{contents}</p>
            </div>
        );
    }
}

export default RecGuide;