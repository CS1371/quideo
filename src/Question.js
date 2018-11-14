import React from 'react';
import './Quideo.css';

class Question extends React.Component {
    render() {
        const title = "question title"

        return(
            <div classname="question">
                <p>{title}</p>
            </div>
        );
    }
}

export default Question;