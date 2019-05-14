import React from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import 'brace/mode/matlab';
import 'brace/theme/sqlserver';
import './CodingAnswer.css';
import HintList from './HintList';

export default class CodingAnswer extends React.Component {
  static propTypes = {
    answer: PropTypes.string.isRequired,
    hints: PropTypes.arrayOf(PropTypes.string)
  };

  static defaultProps = {
    hints: []
  };

  constructor(props) {
    super(props);

    this.state = {
      showAnswer: null,
      userAnswer: ''
    };
  }

  render() {
    // if showing answer, we want our code side by side with theirs. Otherwise,
    // show our textarea and their preview.
    const { showAnswer, userAnswer } = this.state;
    const { answer, hints } = this.props;

    let aceClass = '';
    if (showAnswer !== null && showAnswer) {
      aceClass = 'answer-show';
    } else if (showAnswer !== null && !showAnswer) {
      aceClass = 'answer-hide';
    }
    return (
      <div className="coding-answer">
        <p>Type your code below. When ready, press Show Answer to compare</p>
        <div className={`code-area ${aceClass}`}>
          <AceEditor
            mode="matlab"
            theme="sqlserver"
            value={userAnswer}
            onChange={val => {
              this.setState({
                userAnswer: val
              });
            }}
            setOptions={{ autoScrollEditorIntoView: true }}
            editorProps={{ $blockScrolling: true }}
            width="45vw"
            className="code-editor"
            fontSize={18}
          />
          <AceEditor
            mode="matlab"
            theme="sqlserver"
            value={answer}
            className="answer-code-viewer"
            fontSize={18}
            width="45vw"
            editorProps={{ $blockScrolling: Infinity }}
            setOptions={{ autoScrollEditorIntoView: true }}
            readOnly
          />
        </div>
        <HintList hints={hints} />
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
