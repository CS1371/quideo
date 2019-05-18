import React from 'react';
import PropTypes from 'prop-types';
import hash from 'object-hash';
import Markdown from 'react-markdown';
import AceEditor from 'react-ace';

import MarkdownEditor from './MarkdownEditor';
import CodingAnswer from './CodingAnswer';
import { OrderedList, CodeBlock } from '../utility';
import './ShortAnswer.css';
import '../question-viewer/Prompt.css';

import 'brace/mode/matlab';
import 'brace/theme/sqlserver';

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

  renderAnswer = () => {
    const { answer, isCode } = this.state;
    if (isCode) {
      return (
        <React.Fragment>
          <h2>Coding Entry</h2>
          <CodingAnswer
            value={answer}
            onChange={v => {
              this.setState({
                answer: v
              });
            }}
          />
        </React.Fragment>
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
        title="Free Form Answer"
      />
    );
  };

  renderEditor = () => {
    const { value, onChange } = this.props;
    const { prompt, answer, isCode } = this.state;
    return (
      <div className="new-short-answer">
        <h2>New Short Answer</h2>
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
        {this.renderAnswer()}
        <button
          type="button"
          className="add-part-btn"
          onClick={() => {
            // check that we are valid
            if (prompt === '' || answer === '') {
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
          }}
        >
          Add Part
        </button>
      </div>
    );
  };

  renderPrompt = (n, i) => {
    const { value, onChange } = this.props;
    const { prompt, answer, isCode } = n;
    let answerArea = null;

    if (isCode) {
      answerArea = (
        <AceEditor
          value={answer}
          width="100%"
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
          <div className="prompt">
            <Markdown source={prompt} renderers={{ code: CodeBlock }} />
          </div>
          <div className="prompt-answer">{answerArea}</div>
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
          <OrderedList render={this.renderPrompt} onChange={onChange}>
            {value}
          </OrderedList>
        </div>
        {this.renderEditor()}
      </div>
    );
  }
}
