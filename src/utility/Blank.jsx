import React from 'react';
import PropTypes from 'prop-types';
import './Blank.css';

const MAX_BLANK_LEN = 20;

export default class Blank extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.node)
  };

  static defaultProps = {
    value: '',
    children: []
  };

  constructor(props) {
    super(props);

    this.state = {
      answer: ''
    };
  }

  render() {
    const { answer } = this.state;
    const { value, children } = this.props;
    // prioritize value over children
    let effective = answer;
    let readonly = false;
    if (value.trim() !== '') {
      effective = value;
      readonly = true;
    } else if (children.length !== 0) {
      // Hack for React-Markdown - given as node with props with value
      // Still check value.trim!
      effective = children[0].props.value;
      readonly = true;
      // if no exclamation points - then literally just strong
      if (effective.length < 2 || effective[0] !== '!' || effective[effective.length - 1] !== '!') {
        return <s>{effective}</s>;
      }
      if (/^!\s*!$/g.test(effective)) {
        effective = answer;
        readonly = false;
      } else {
        effective = effective.replace(/!([^!]*)!/g, '$1');
      }
    }
    const help =
      effective.length > MAX_BLANK_LEN && readonly
        ? 'You really should only have 20 characters'
        : '';
    // now, if effective has ! ! as it's child, then let them enter!
    return (
      <input
        className={`blank-input ${help.length !== 0 ? 'invalid-blank' : ''}`}
        type="text"
        value={effective.trim() === '' ? answer : effective}
        readOnly={readonly}
        size={MAX_BLANK_LEN}
        onChange={v => this.setState({ answer: v.target.value })}
        spellCheck="false"
        autoCorrect="false"
        title={help}
      />
    );
  }
}
