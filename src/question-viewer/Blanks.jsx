import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import HintList from './HintList';
import { CodeBlock, Blank } from '../utility';

import '../utility/MarkdownArea.css';

import './Blanks.css';

// Show two markdown areas side-by-side - the original (with text boxes)
// and the new (with answers spliced in)
//

export default class Blanks extends React.Component {
  static propTypes = {
    question: PropTypes.string.isRequired,
    hints: PropTypes.arrayOf(PropTypes.string)
  };

  static defaultProps = {
    hints: []
  };

  constructor(props) {
    super(props);

    this.state = {
      showAnswer: false
    };
  }

  render() {
    // first show the normal Markdown (replace with BLANKS), then on showAnswer, show the other stuff
    const { question, hints } = this.props;
    const { showAnswer } = this.state;
    const correct = question.replace(/~~!([^~]+)!~~/g, '$1');
    return (
      <div className="fill-blank-question">
        <div className="question-area">
          <div className="student-blanks markdown-preview">
            <Markdown
              source={question}
              renderers={{
                code: CodeBlock,
                delete: Blank
              }}
            />
          </div>
          <div className={`filled-blanks markdown-preview ${showAnswer ? 'show-answer' : ''}`}>
            <Markdown source={correct} renderers={{ code: CodeBlock }} />
          </div>
        </div>
        <div>
          <button
            className="btn-show-answer"
            type="button"
            onClick={() => {
              this.setState({
                showAnswer: !showAnswer
              });
            }}
          >
            {showAnswer ? 'Hide Answer' : 'Show Answer'}
          </button>
        </div>
        <HintList hints={hints} />
      </div>
    );
  }
}
