import React from 'react';
import PropTypes from 'prop-types';
import MarkdownEditor from './MarkdownEditor';
import CodingAnswer from './CodingAnswer';

import './ShortAnswer.css';
import { OrderedList } from '../utility';

// Each prompt will either be code or free response (markdown)
export default class ShortAnswer extends React.Component {
  static propTypes = {
    value: PropTypes.arrayOf(
      PropTypes.shape({
        prompt: PropTypes.string.isRequired,
        answer: PropTypes.string.isRequired
      })
    ).isRequired,
    onChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      prompt: '',
      answer: '',
      isCode: false
    };
  }

  swap = (a, b) => {
    const { value, onChange } = this.props;
    // check bounds
    if (a >= value.length || a < 0 || b >= value.length || b < 0) {
      return;
    }
    [value[a], value[b]] = [value[b], value[a]];
    onChange(value);
  };

  render() {
    const { value, onChange } = this.props;
    const { prompt, answer, isCode } = this.state;
    let answerEditor = null;
    if (isCode) {
      answerEditor = (
        <CodingAnswer
          value={answer}
          onChange={v => {
            this.setState({
              answer: v
            });
          }}
        />
      );
    } else {
      answerEditor = (
        <MarkdownEditor
          value={answer}
          onChange={v => {
            this.setState({
              answer: v
            });
          }}
          title="Free Form Answer"
        />
      );
    }
    return (
      <div className="short-answer-editor">
        <div className="confirmed-answers">
          <OrderedList
            onSwap={(a, b) => {
              this.swap()
            }}
            onRemove={i => {

            }}
            >
              {value.map(v => v)}
            </OrderedList>
        </div>
        <div className="new-short-answer">
          <MarkdownEditor
            onChange={v => {
              this.setState({
                prompt: v
              });
            }}
            value={prompt}
            title="Prompt"
            help="The prompt for this part"
          />
          {answerEditor}
          <button
            type="button"
            onClick={() => {
              this.setState({
                value
              });
            }}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}
