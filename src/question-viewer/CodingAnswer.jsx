import React from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import 'brace/mode/matlab';
import 'brace/theme/sqlserver';
import './CodingAnswer.css';

export default class CodingAnswer extends React.Component {
  static propTypes = {
    answer: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      showAnswer: false,
      userAnswer: ''
    };
  }

  render() {
    // if showing answer, we want our code side by side with theirs. Otherwise,
    // show our textarea and their preview.
    const { showAnswer, userAnswer } = this.state;
    const { answer } = this.props;

    return (
      <div className="coding-answer">
        <p>Type your code below. When ready, press Show Answer to compare</p>
        <div className={`code-area ${showAnswer ? 'answer-show' : 'answer-hide'}`}>
          <AceEditor
            mode="matlab"
            theme="sqlserver"
            value={userAnswer}
            onChange={val => {
              this.setState({
                userAnswer: val
              });
            }}
            width
            className="code-editor"
            fontSize={18}
          />
          <AceEditor
            mode="matlab"
            theme="sqlserver"
            value={answer}
            className="answer-code-viewer"
            fontSize={18}
            // Can we specify fontSize via CSS?
            width
            readOnly
          />
        </div>
        <button
          type="button"
          className="btn-answer"
          onClick={() => {
            this.setState({
              showAnswer: !showAnswer
            });
          }}
        >
          {showAnswer ? 'Hide Answer' : 'Show Answer'}
        </button>
      </div>
    );
  }
}
