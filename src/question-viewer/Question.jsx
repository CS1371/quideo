import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPepperHot } from '@fortawesome/free-solid-svg-icons';
import hash from 'object-hash';
import Tag from './Tag';
import Rubric from './Rubric';
import Preamble from './Preamble';
import { Question as QuestionType } from '../utility';
import './Question.css';
import QuestionPart from './QuestionPart';

export default class Question extends React.Component {
  static propTypes = {
    /** The ordering of this question */
    index: PropTypes.number,
    /** The primary topic for this question */
    primaryTag: PropTypes.shape({
      name: PropTypes.string.isRequired,
      week: PropTypes.number.isRequired
    }).isRequired,
    /** The tags that apply to this question */
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        week: PropTypes.number.isRequired // should this really be a number?
      })
    ).isRequired,
    /** The markdown rubric that shows how we'd grade this */
    rubric: PropTypes.string.isRequired,
    /** The preamble for a question, and the only part of MC and LA */
    preamble: PropTypes.string.isRequired,
    /** The rating, from 0 to 4 */
    difficulty: PropTypes.number.isRequired,
    /** The questions to present */
    questions: PropTypes.arrayOf(PropTypes.shape(QuestionType)).isRequired
  };

  static defaultProps = {
    index: 0
  };

  constructor(props) {
    super(props);

    this.state = {
      showRubric: false
    };
  }

  renderPeppers = () => {
    const { difficulty } = this.props;
    const peppers = [];
    for (let i = 0; i < difficulty; i++) {
      peppers.push(<FontAwesomeIcon key={i} icon={faPepperHot} />);
    }
    return peppers;
  };

  renderPart = (q, i) => {
    const { type } = q;
    return (
      <QuestionPart
        header={<h2 className="question-header">{`#${i + 1} - ${type}`}</h2>}
        key={hash(q)}
        {...q}
      />
    );
  };

  render() {
    const { index, tags, primaryTag, rubric, preamble, questions } = this.props;
    const { showRubric } = this.state;
    // Don't print Preamble for Fill in the Blank (Because Blanks prints its own?)
    return (
      <div className="question-view">
        <h1 className="question-title">{`${index}: ${primaryTag.name}`}</h1>
        <div className="question-difficulty">{this.renderPeppers()}</div>
        <div className="question-tags">
          {[primaryTag, ...tags.sort((a, b) => a.week - b.week)].map(tag => (
            <Tag key={hash(tag)} {...tag} />
          ))}
        </div>
        {preamble === '' ? null : <Preamble value={preamble} />}
        <div className="question-parts">{questions.map(this.renderPart)}</div>
        <div className="question-rubric">
          <button type="button" onClick={() => this.setState({ showRubric: !showRubric })}>
            {showRubric ? 'Hide Rubric' : 'Show Rubric'}
          </button>
          <Rubric isShown={showRubric} text={rubric} />
        </div>
      </div>
    );
  }
}
