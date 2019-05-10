import React from 'react';
import Markdown from 'react-markdown';
import PropTypes from 'prop-types';
import hash from 'object-hash';
import { CodeBlock } from '../utility/CodeBlock';
import './MultipleChoice.css';

const MultipleChoice = props => {
  const { answers } = props;
  return (
    <React.Fragment>
      <p>Click the answer you think is correct</p>
      <div className="mc-question">
        <div className="mc-answers">
          {answers.map(ans => (
            <Option
              key={hash(ans.text)}
              text={ans.text}
              explanation={ans.explanation}
              isCorrect={ans.isCorrect}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

MultipleChoice.propTypes = {
  answers: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      explanation: PropTypes.string,
      isCorrect: PropTypes.bool
    })
  ).isRequired
};

class Option extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    explanation: PropTypes.string.isRequired,
    isCorrect: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      isChosen: false
    };
  }

  render() {
    const { isChosen } = this.state;
    const eClass = isChosen ? 'mc-chosen' : '';
    const { text, explanation, isCorrect } = this.props;

    return (
      <div className="mc-option">
        <button
          className={`mc-answer ${eClass}`}
          type="button"
          onClick={() => {
            this.setState({
              isChosen: !isChosen
            });
          }}
        >
          <Markdown source={text} renderers={{ code: CodeBlock }} />
        </button>
        <p
          className={`mc-explanation ${isCorrect ? 'mc-correct' : 'mc-incorrect'} ${
            isChosen ? 'mc-chosen' : ''
          }`}
        >
          {explanation}
        </p>
      </div>
    );
  }
}

export default MultipleChoice;
