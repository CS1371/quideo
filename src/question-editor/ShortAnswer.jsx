import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';

import MarkdownEditor from './MarkdownEditor';
import CodingAnswer from './CodingAnswer';
import { OrderedList, CodeBlock } from '../utility';
import confirmedShort from './confirmedShort';

import './ShortAnswer.css';
import '../utility/MarkdownArea.css';

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

  isReady = () => {
    const { prompt, answer } = this.state;
    return prompt !== '' && answer !== '';
  };

  addPart = () => {
    // check that we are valid
    const { prompt, answer, isCode } = this.state;
    const { value, onChange } = this.props;
    if (!this.isReady()) {
      return;
    }
    value.push({
      prompt,
      answer,
      isCode
    });
    onChange(value);
    this.setState({
      prompt: '',
      answer: '',
      isCode: false
    });
  };

  renderAnswer = () => {
    const { answer, isCode } = this.state;
    if (isCode) {
      return (
        <CodingAnswer
          value={answer}
          onChange={v => {
            this.setState({
              answer: v
            });
          }}
        />
      );
    }
    return (
      <MarkdownEditor
        value={answer}
        onChange={v => {
          this.setState({
            answer: v
          });
        }}
        hidePreview
        title="Free Form Answer"
      />
    );
  };

  renderPreview = () => {
    const { prompt, answer, isCode } = this.state;
    if (isCode) {
      return null;
    }
    return (
      <div className="short-answer-preview">
        <div className="preview-prompt markdown-preview">
          <Markdown
            source={prompt === '' ? '_Start typing to see a preview of your prompt_' : prompt}
            renderers={{ code: CodeBlock }}
          />
        </div>
        <div className="preview-answer markdown-preview">
          <Markdown
            source={answer === '' ? '_Start typing to see a preview of your answer_' : answer}
            renderers={{ code: CodeBlock }}
          />
        </div>
      </div>
    );
  };

  renderEditor = () => {
    const { prompt, isCode } = this.state;
    return (
      <div className={`short-answer-editors ${isCode ? 'short-code' : 'short-free'}`}>
        <MarkdownEditor
          onChange={v => {
            this.setState({
              prompt: v
            });
          }}
          hidePreview={!isCode}
          value={prompt}
          title="Prompt"
          help=""
        />
        {this.renderAnswer()}
      </div>
    );
  };

  render() {
    const { value, onChange } = this.props;
    const { isCode } = this.state;
    return (
      <div className="short-answer-editor">
        <div className="confirmed-answers">
          <OrderedList render={(n, i) => confirmedShort(n, i, this)} onChange={onChange}>
            {value}
          </OrderedList>
        </div>
        <div className="new-short-answer">
          <h2>New Short Answer</h2>
          <button
            type="button"
            className="short-type-toggler"
            onClick={() => {
              this.setState({
                isCode: !isCode
              });
            }}
          >
            {isCode ? 'Change to Free Form' : 'Change to Code Entry'}
          </button>
          {this.renderEditor()}
          {this.renderPreview()}
          <button
            type="button"
            disabled={!this.isReady()}
            className="add-part-btn"
            onClick={this.addPart}
          >
            Add Part
          </button>
        </div>
      </div>
    );
  }
}
