import React from 'react';
import PropTypes from 'prop-types';
import hash from 'object-hash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesSquare } from '@fortawesome/pro-solid-svg-icons';
import { MultipleChoiceAnswer as AnswerType } from '../utility';
import { Option } from '../question-viewer';
import MarkdownEditor from './MarkdownEditor';

import './MultipleChoice.css';

export default class MultipleChoice extends React.Component {
  static propTypes = {
    value: PropTypes.arrayOf(AnswerType).isRequired,
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

  addChoice = () => {
    // Add new choice, clear our state
    const { answer, isCorrect, explanation } = this.state;
    const { value, onChange } = this.props;
    // if we don't have an answer, don't do anything
    if (answer === '') {
      return;
    }

    value.push({
      answer,
      isCorrect,
      explanation
    });
    onChange(value);

    this.setState({
      answer: '',
      isCorrect: true,
      explanation: ''
    });
  };

  removeChoice = i => {
    const { value, onChange } = this.props;
    value.splice(i, 1);
    onChange(value);
  };

  renderEditor = () => {
    const { answer, explanation, isCorrect } = this.state;
    const preview = (
      <React.Fragment>
        <p>{`Click the Preview to mark your answer as ${isCorrect ? 'Incorrect' : 'Correct'}`}</p>
        <Option
          answer={answer === '' ? '_Start typing to see your answer_' : answer}
          explanation={explanation === '' ? '_Start typing to see your explanation_' : explanation}
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
    return (
      <div className="choice-creator">
        <h2>Create a New Choice</h2>
        <div className="new-choices">
          <MarkdownEditor
            title="Answer"
            help="Start typing to see a preview"
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
        <button type="button" id="addChoice" onClick={this.addChoice} disabled={answer === ''}>
          Add this Choice
        </button>
      </div>
    );
  };

  render() {
    const { value, onChange } = this.props;
    return (
      <div className="multipe-choice-container">
        <h2>Possible Choices</h2>
        <div className="confirmed-choices">
          {value.length !== 0 ? <p>Click on a choice to delete it</p> : null}
          {value.map((c, i) => {
            // What if the user makes two identical answers? Alert if hash would be the same
            return (
              <div key={hash(c)} className="single-choice">
                <FontAwesomeIcon
                  icon={faTimesSquare}
                  onClick={() => {
                    this.removeChoice(i);
                  }}
                />
                <Option
                  {...c}
                  shouldExpand
                  handler={() => {
                    this.setState(c);
                    this.removeChoice(i);
                  }}
                />
              </div>
            );
          })}
        </div>
        {this.renderEditor()}
      </div>
    );
  }
}