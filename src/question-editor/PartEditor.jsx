import React from 'react';
import PropTypes from 'prop-types';
import hash from 'object-hash';
import TypeChooser from './TypeChooser';
import MarkdownEditor from './MarkdownEditor';
import { QuestionPart } from '../question-viewer';
import { TYPES, Question as QuestionType, OrderedList } from '../utility';
import MultipleChoice from './MultipleChoice';
import CodingAnswer from './CodingAnswer';
import ShortAnswer from './ShortAnswer';
import Blanks from './Blanks';
import './PartEditor.css';

export default class PartEditor extends React.Component {
  static propTypes = {
    availableTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    confirmed: PropTypes.arrayOf(PropTypes.shape(QuestionType)).isRequired,
    onChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    // What do we need to keep
    this.state = {
      type: '',
      prompt: '',
      answer: '',
      hints: []
    };
  }

  setType = t => {
    if (t === TYPES.MC) {
      this.setState({
        type: t,
        answer: []
      });
    } else {
      this.setState({
        type: t,
        answer: ''
      });
    }
  };

  renderQuestion = () => {
    const { type, prompt, answer } = this.state;
    let specifics = null;
    const questionProps = {
      value: answer,
      onChange: v => {
        this.setState({ answer: v });
      }
    };
    switch (type) {
      case TYPES.MC:
        specifics = <MultipleChoice {...questionProps} />;
        break;
      case TYPES.SA:
        specifics = <ShortAnswer {...questionProps} />;
        break;
      case TYPES.FB:
        specifics = <Blanks {...questionProps} />;
        break;
      case TYPES.CA:
        specifics = <CodingAnswer {...questionProps} />;
        break;
      default:
        break;
    }
    return (
      <div className={`specific-editor ${specifics === null ? 'editor-hide' : 'editor-show'}`}>
        {type !== TYPES.FB ? (
          <MarkdownEditor
            value={prompt}
            title="Prompt"
            help="Write your question here"
            onChange={v => {
              this.setState({
                prompt: v
              });
            }}
          />
        ) : null}
        {specifics}
      </div>
    );
  };

  renderAdder = () => {
    const { type, prompt, answer, hints } = this.state;
    const { confirmed, onChange } = this.props;
    if (type === '' || (prompt === '' && answer === '')) {
      return null;
    }
    return (
      <button
        type="button"
        className="part-add-btn"
        onClick={() => {
          onChange(
            confirmed.concat({
              type,
              prompt,
              answer,
              hints
            })
          );
          this.setState({
            type: '',
            prompt: '',
            answer: '',
            hints: []
          });
        }}
      >
        Add Part
      </button>
    );
  };

  renderConfirmed = (n, i) => {
    return (
      <div key={hash(n)} className="confirmed-part">
        <QuestionPart key={hash(n)} showAnswer {...n} />
      </div>
    );
  };

  onEdit = (n, i) => {
    const { onChange, confirmed } = this.props;
    this.setState(n);
    confirmed.splice(i, 1);
    onChange(confirmed);
  };

  render() {
    const { type, hints } = this.state;
    const { availableTypes, onChange, confirmed } = this.props;

    const title = `Part Editor${type === '' ? '' : `: ${type}`}`;

    return (
      <div className="question-parts">
        <div className="confirmed-parts">
          <OrderedList
            onChange={v => onChange(v)}
            onEdit={(n, i) => this.onEdit(n, i)}
            render={this.renderConfirmed}
          >
            {confirmed}
          </OrderedList>
        </div>
        <div className="part-editor">
          <h2>{title}</h2>
          <TypeChooser availableTypes={availableTypes} value={type} onChange={this.setType} />
          {this.renderQuestion()}
          {this.renderAdder()}
        </div>
      </div>
    );
  }
}
