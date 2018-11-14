import React from 'react';
import './Quideo.css';

class Quideo extends React.Component {
    render() {
        return (
            //<h1> Quideo! </h1>
            <div className="quideo">
                <div className="learn">
                    <h2> Learn </h2>
                    <p> here is a rec guide </p>
                    <p> here is a video thumbnail </p>
                </div>
                <div className="practice">
                    <h2> Practice </h2>
                    <p> here is a question! </p>
                    <p> here is a question! </p>
                </div>
                <div className="test">
                    <h2> Test Yourself </h2>
                    <p> here is a question! </p>
                    <p> here is a question! </p>
                </div>
            </div>
        );
    }
}

export default Quideo;
