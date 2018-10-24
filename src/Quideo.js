import React from 'react';
import './Quideo.css';

class Quideo extends React.Component {
    render() {
        return (
            <div className="quideo">
                <h1>Quideo</h1>
                <p className="subtitle">Welcome to the vestion quank</p>
                <table id="divider">
                    <tr>
                        <th>Learn</th>
                        <th>Practice</th>
                        <th>Test</th>
                    </tr>
                    <tr>
                        <th>Here's a small rec guide</th>
                        <th>mc question for this topic!</th>
                        <th>short coding question for this topic</th>
                    </tr>
                    <tr>
                        <th> video thumbnail</th>
                        <th>tracing question</th>
                        <th>short coding question for this topic</th>
                    </tr>
                    <tr>
                        <th> video description/details</th>
                        <th> first short coding</th>
                        <th> harder long coding</th>
                    </tr>
                </table>
            </div>
        );
    }
}

export default Quideo;
