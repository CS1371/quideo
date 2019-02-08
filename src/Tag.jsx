import React from "react";

export default class Tag extends React.Component {
    /* Properties:
    * Name
    * Date Active
    */
    render() {
        return (
            <div className="tag">
                <p>{this.props.name}</p>
            </div>
        );
    }
}