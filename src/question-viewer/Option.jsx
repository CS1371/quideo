import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentCheck, faCommentTimes } from '@fortawesome/pro-solid-svg-icons';
import { CodeBlock } from '../utility';

import './Option.css';

export default class Option extends React.Component {
  static propTypes = {
    answer: PropTypes.string.isRequired,
    explanation: PropTypes.string.isRequired,
    isCorrect: PropTypes.bool.isRequired,
    handler: PropTypes.func,
    shouldExpand: PropTypes.bool
  };

  static defaultProps = {
    handler: () => {},
    shouldExpand: false
  };

  constructor(props) {
    super(props);

    this.state = {
      isChosen: false
    };
  }

  render() {
    const { isChosen } = this.state;
    const { answer, explanation, isCorrect, shouldExpand, handler } = this.props;
    const eClass = isChosen || shouldExpand ? 'mc-chosen' : '';

    return (
      <div className="mc-option">
        <button
          className={`mc-answer ${eClass}`}
          type="button"
          onClick={() => {
            handler();
            this.setState({
              isChosen: !isChosen
            });
          }}
        >
          <Markdown source={answer} renderers={{ code: CodeBlock }} p2="hi" />
        </button>
        <div
          className={`mc-explanation ${isCorrect ? 'mc-correct' : 'mc-incorrect'} ${
            isChosen || shouldExpand ? 'mc-chosen' : ''
          }`}
        >
          <FontAwesomeIcon icon={isCorrect ? faCommentCheck : faCommentTimes} />
          <Markdown source={explanation} renderers={{ code: CodeBlock }} />
        </div>
      </div>
    );
  }
}
