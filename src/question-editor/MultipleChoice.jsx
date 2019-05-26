import React from 'react';
import PropTypes from 'prop-types';
import hash from 'object-hash';
import { MultipleChoiceAnswer as AnswerType, OrderedList } from '../utility';
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

  renderPreview = () => {
    const { answer, explanation, isCorrect } = this.state;
    return (
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
  };

  renderError = () => {
    const { answer } = this.state;
    const { value } = this.props;
    if (answer.length === 0) {
      return null;
    }
    const ind = value.findIndex(a => a.answer === answer);
    return ind !== -1 ? (
      <p className="reason-invalid">
        <i>{`You've already given this as an answer (see #${ind + 1})`}</i>
      </p>
    ) : (
      <button
        type="button"
        id="addChoice"
        onClick={this.addChoice}
        disabled={answer === '' || ind !== -1}
      >
        Add this Choice
      </button>
    );
  };

  renderEditor = () => {
    const { answer, explanation } = this.state;
    // compare answers...
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
        <div className="new-preview">{this.renderPreview()}</div>
        {this.renderError()}
      </div>
    );
  };

  onEdit = (n, i) => {
    const { onChange, value } = this.props;
    this.setState(n);
    value.splice(i, 1);
    onChange(value);
  };

  render() {
    const { onChange, value } = this.props;
    return (
      <div className="multipe-choice-container">
        <h2>Possible Choices</h2>
        <div className="confirmed-choices">
          <OrderedList
            render={v => <Option key={hash(v)} {...v} shouldExpand />}
            onChange={onChange}
            onEdit={this.onEdit}
          >
            {value}
          </OrderedList>
        </div>
        {this.renderEditor()}
      </div>
    );
  }
}
