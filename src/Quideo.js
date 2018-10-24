import React from 'react';
import './Quideo.css';
import Sidebar from './Sidebar';

class Quideo extends React.Component {
    render() {
        return (
            <div className="quideo">
                <h1>Hello, World!</h1>
                <Sidebar />
            </div>
        );
    }
}

export default Quideo;
