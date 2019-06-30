import React from 'react';
import PropTypes from 'prop-types';
import { MarkdownViewer } from '../utility';

import './Blanks.css';
import AnswerButton from './AnswerButton';

// Show two markdown areas side-by-side - the original (with text boxes)
// and the new (with answers spliced in)
//

export default class Blanks extends React.Component {
  static propTypes = {
    question: PropTypes.string.isRequired,
    hints: PropTypes.node,
    showAnswer: PropTypes.bool
  };

  static defaultProps = {
    hints: null,
    showAnswer: false
  };

  constructor(props) {
    super(props);

    this.state = {
      toggleAnswer: false
    };
  }

  renderPreview = () => {
    const { question, showAnswer } = this.props;
    const { toggleAnswer } = this.state;
    const shouldShow = showAnswer || toggleAnswer;
    return (
      <div className={`question-area ${shouldShow ? 'show-answer' : 'hide-answer'}`}>
        {showAnswer ? null : (
          <div className="student-blanks">
            <MarkdownViewer value={question.replace(/(?<=~~!)[^~]+(?=!~~)/g, ' ')} />
          </div>
        )}
        <div className="filled-blanks">
          <MarkdownViewer value={question} />
        </div>
      </div>
    );
  };

  render() {
    // first show the normal Markdown (replace with BLANKS), then on showAnswer, show the other stuff
    const { showAnswer, hints } = this.props;
    const { toggleAnswer } = this.state;

    return (
      <div className="fill-blank-question">
        {hints}
        {this.renderPreview()}
        <div>
          <AnswerButton
            handler={() => {
              this.setState({
                toggleAnswer: !toggleAnswer
              });
            }}
            showAnswer={showAnswer || toggleAnswer}
          />
        </div>
      </div>
    );
  }
}
