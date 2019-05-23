import React from 'react';
import './Blank.css';

const MAX_BLANK_LEN = 20;

export default class Blank extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answer: ''
    };
  }

  render() {
    const { answer } = this.state;
    return (
      <input
        className="blank-input"
        type="text"
        value={answer}
        size={MAX_BLANK_LEN}
        onChange={v => this.setState({ answer: v.target.value })}
        spellCheck="false"
        autoCorrect="false"
      />
    );
  }
}
