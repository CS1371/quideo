import React from 'react';
import PropTypes from 'prop-types';
import hash from 'object-hash';
import Markdown from 'react-markdown';
import AceEditor from 'react-ace';

import MarkdownEditor from './MarkdownEditor';
import CodingAnswer from './CodingAnswer';
import { OrderedList, CodeBlock } from '../utility';

import 'brace/mode/matlab';
import 'brace/theme/sqlserver';

import './ShortAnswer.css';
import '../utility/MarkdownArea.css';

// Each prompt will either be code or free response (markdown)

const HEIGHT_MULT = 1.4;

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
          <Markdown source={prompt} renderers={{ code: CodeBlock }} />
        </div>
        <div className="preview-answer markdown-preview">
          <Markdown source={answer} renderers={{ code: CodeBlock }} />
        </div>
      </div>
    );
  };

  renderEditor = () => {
    const { prompt, isCode } = this.state;
    return (
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
    );
  };

  renderConfirmed = (n, i) => {
    const { value, onChange } = this.props;
    const { prompt, answer, isCode } = n;
    let answerArea = null;
    if (isCode) {
      answerArea = (
        <AceEditor
          value={answer}
          width="100%"
          fontSize={18}
          height={`${Math.min((answer.match(/\n/g) || '').length + 1, 20) * HEIGHT_MULT}em`}
          mode="matlab"
          theme="sqlserver"
          readOnly
          editorProps={{ $blockScrolling: Infinity }}
        />
      );
    } else {
      answerArea = <Markdown source={answer} renderers={{ code: CodeBlock }} />;
    }
    return (
      <div key={hash(n)} className="single-prompt">
        <div className="prompt-view">
          <div className="prompt markdown-preview">
            <Markdown source={prompt} renderers={{ code: CodeBlock }} />
          </div>
          <div className={`prompt-answer ${isCode ? '' : 'markdown-preview'}`}>{answerArea}</div>
        </div>
        <button
          type="button"
          className="prompt-edit-btn"
          onClick={() => {
            this.setState(n);
            value.splice(i, 1);
            onChange(value);
          }}
        >
          Edit
        </button>
      </div>
    );
  };

  render() {
    const { value, onChange } = this.props;

    return (
      <div className="short-answer-editor">
        <div className="confirmed-answers">
          <OrderedList render={this.renderConfirmed} onChange={onChange}>
            {value}
          </OrderedList>
        </div>
        {this.renderEditor()}
      </div>
    );
  }
}
