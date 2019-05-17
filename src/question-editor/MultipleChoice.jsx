import React from 'react';
import PropTypes from 'prop-types';
import hash from 'object-hash';
import Markdown from 'react-markdown';
import { CodeBlock, MultipleChoiceAnswer as Answer} from '../utility';
import { Option } from '../question-viewer';
import MarkdownEditor from './MarkdownEditor';

import './MultipleChoice.css';

export default class MultipleChoice extends React.Component {
  static propTypes = {
    value: PropTypes.arrayOf(Answer).isRequired,
    onChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      answer: '',
      isCorrect: true,
      explanation: ''
    };
  }

  render() {
    const { value, onChange } = this.props;
    const { answer, isCorrect, explanation } = this.state;

    let preview = null;
    if (answer !== '') {
      preview = (
        <React.Fragment>
          <p>{`Click the Preview to mark your answer as ${isCorrect ? 'Incorrect' : 'Correct'}`}</p>
          <Option
            text={answer}
            explanation={explanation}
            isCorrect={isCorrect}
            shouldExpand
            handler={() => {
              this.setState({
                isCorrect: !isCorrect
              });
            }}
          />
        </React.Fragment>
      );
    }

    return (
      <div className="multipe-choice-container">
        <div className="confirmed-choices">
          {value.map((c, i) => {
            // What if the user makes two identical answers? Alert if hash would be the same
            return (
              <Choice
                {...c}
                key={hash(c.answer)}
                onDelete={() => {
                  value.splice(i, 1);
                  onChange(value);
                }}
              />
            );
          })}
        </div>
        <div className="new-choices">
          <MarkdownEditor
            title="Answer"
            help="Start typing to see a preview of your choice"
            value={answer}
            hidePreview
            onChange={v => {
              this.setState({
                answer: v
              });
            }}
          />
          <MarkdownEditor
            title="Explanation"
            help={`Why is your answer ${isCorrect ? 'correct' : 'incorrect'}?`}
            value={explanation}
            hidePreview
            onChange={v => {
              this.setState({
                explanation: v
              });
            }}
          />
        </div>
        <div className="new-preview">{preview}</div>
      </div>
    );
  }
}

const Choice = props => {
  const { answer, isCorrect, explanation, onDelete } = props;
  return (
    <div className="single-choice">
      <p>{`The ${isCorrect ? 'Correct' : 'Incorrect'} answer`}</p>
      <button type="button" onClick={onDelete}>
        Delete this Choice
      </button>
      <Markdown source={answer} renderers={{ code: CodeBlock }} />
      <Markdown source={explanation} renderers={{ code: CodeBlock }} />
    </div>
  );
};

Choice.propTypes = {
  answer: PropTypes.string.isRequired,
  isCorrect: PropTypes.bool.isRequired,
  explanation: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired
};
