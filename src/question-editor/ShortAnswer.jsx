import React from 'react';
import PropTypes from 'prop-types';
import hash from 'object-hash';
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
            render={(n, i) => (
              <div key={hash(n)} className="short-answer">
                <p>{n + i}</p>
              </div>
            )}
            onChange={onChange}
          >
            {value}
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
