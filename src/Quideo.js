import React from 'react';
import './Quideo.css';
import Question from './Question';
import RecGuide from './RecGuide';

class Quideo extends React.Component {
    render() {
        return (
            <div className="quideo">
                <h1> Quideo! </h1>
                <div className="columns">
                    <div className="learn">
                        <h2> Learn </h2>
                        <RecGuide rg></RecGuide>
                        <p> here is a video thumbnail </p>
                    </div>
                    <div className="practice">
                        <h2> Practice </h2>
                        <Question q></Question>
                        <Question q></Question>
                    </div>
                    <div className="test">
                        <h2> Test Yourself </h2>
                        <Question q></Question>
                        <Question q></Question>
                    </div>
                </div>
            </div>
        );
    }
}

export default Quideo;
