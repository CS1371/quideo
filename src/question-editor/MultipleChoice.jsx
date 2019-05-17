import React from 'react';
import PropTypes from 'prop-types';
import hash from 'object-hash';
import { MultipleChoiceAnswer as AnswerType } from '../utility';
import { Option } from '../question-viewer';
import MarkdownEditor from './MarkdownEditor';

import './MultipleChoice.css';
import OrderedList from '../utility/OrderedList';

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

  swapChoice = (a, b) => {
    const { value, onChange } = this.props;
    // check bounds
    if (a >= value.length || a < 0 || b >= value.length || b < 0) {
      return;
    }
    [value[a], value[b]] = [value[b], value[a]];
    onChange(value);
  };

  renderEditor = () => {
    const { answer, explanation, isCorrect } = this.state;
    const { value } = this.props;
    const preview = (
      <React.Fragment>
        <p>{`Click the preview to mark your answer as ${isCorrect ? 'incorrect' : 'correct'}`}</p>
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
    // compare answers...
    const ind = value.findIndex(a => a.answer === answer);
    return (
      <div className="choice-creator">
        <h2>Create a New Choice</h2>
        <div className="new-choices">
          <MarkdownEditor
            title="Answer"
            value={answer}
            height="250px"
            hidePreview
            onChange={v => {
              this.setState({
                answer: v
              });
            }}
          />
          <MarkdownEditor
            title="Explanation"
            value={explanation}
            height="250px"
            hidePreview
            onChange={v => {
              this.setState({
                explanation: v
              });
            }}
          />
        </div>
        {ind === -1 ? null : (
          <p className="reason-invalid">
            <i>{`You've already given this as an answer (see #${ind + 1})`}</i>
          </p>
        )}
        <div className="new-preview">{preview}</div>
        <button
          type="button"
          id="addChoice"
          onClick={this.addChoice}
          disabled={answer === '' || ind !== -1}
        >
          Add this Choice
        </button>
      </div>
    );
  };

  render() {
    const { value } = this.props;
    return (
      <div className="multipe-choice-container">
        <h2>Possible Choices</h2>
        <div className="confirmed-choices">
          {value.length !== 0 ? <p>Click on a choice to edit it</p> : null}
          <OrderedList
            onSwap={(a, b) => {
              this.swapChoice(a, b);
            }}
            onRemove={i => {
              this.removeChoice(i);
            }}
          >
            {value.map((c, i) => {
              return (
                <Option
                  key={hash(c)}
                  {...c}
                  shouldExpand
                  handler={() => {
                    this.setState(c);
                    this.removeChoice(i);
                  }}
                />
              );
            })}
          </OrderedList>
        </div>
        {this.renderEditor()}
      </div>
    );
  }
}
