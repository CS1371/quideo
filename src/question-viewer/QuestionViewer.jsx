import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPepperHot } from '@fortawesome/free-solid-svg-icons';
import hash from 'object-hash';
import CodeBlock from '../utility';
import Tag from './Tag';
import MultipleChoice from './MultipleChoice';
import Hint from './Hint';
import Rubric from './Rubric';
import ShortAnswer from './ShortAnswer';
import './QuestionViewer.css';
import LongCoding from './LongCoding';

export default class QuestionViewer extends React.Component {
  static propTypes = {
    /** The ordering of this question */
    index: PropTypes.number.isRequired,
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
    /** The type of question (an enum?) */
    type: PropTypes.oneOf([
      'MC', // Multiple choice
      'SA', // Short Answer
      'FB', // Fill in the Blank
      'LC' // Long Coding
    ]).isRequired,
    /** The hints, which is just a string array in the order they should be given */
    hints: PropTypes.arrayOf(PropTypes.string).isRequired,
    /** The question prompts, only for SA */
    prompts: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        isCode: PropTypes.bool.isRequired
      })
    ),
    /** The answers as an array. Even though it always has the same shape,
     * there are important implications on how it should be used in different
     * question type contexts:
     * * If we have MC, then this is an array of possible answer choices, with
     * `isCorrect` set to true if the answer is correct. `explanation` is a
     * markdown string that explains the answer
     * * If we have SA, then this is an array of answers whose length should
     * be the same as prompts
     * * If we have FB, then this is the same as SA
     * * If we have LA, this is a unary array with the TA's answer
     *
     * All answers support markdown in the entry.
     */
    answers: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        explanation: PropTypes.string,
        isCorrect: PropTypes.boolean
      })
    ).isRequired
  };

  static defaultProps = {
    prompts: []
  };

  constructor(props) {
    super(props);

    this.state = {
      showRubric: false,
      showHints: 0
    };
  }
  // Some stuff is common, some not so much. We print the common stuff,
  // feed the other stuff accordingly!

  render() {
    const { index, tags, rubric, preamble, difficulty, type, hints, prompts, answers } = this.props;
    const { showRubric, showHints } = this.state;
    tags.sort((a, b) => a.week - b.week);

    let title = '';
    let question = null;
    switch (type) {
      case 'MC':
        question = <MultipleChoice answers={answers} />;
        title = `${index}: ${tags[tags.length - 1].name} - Multiple Choice`;
        break;
      case 'SA':
        question = <ShortAnswer prompts={prompts} answers={answers.map(a => a.text)} />;
        title = `${index}: ${tags[tags.length - 1].name} - Short Answer`;
        break;
      case 'FB':
        title = `${index}: ${tags[tags.length - 1].name} - Fill in the Blank`;
        break;
      case 'LC':
        question = <LongCoding answer={answers[0].text} />;
        title = `${index}: ${tags[tags.length - 1].name} - Long Coding`;
        break;
      default:
        title = `${index}: ${tags[tags.length - 1].name} - Unknown`;
        break;
    }
    const peppers = [];
    for (let i = 0; i < difficulty; i++) {
      peppers.push(<FontAwesomeIcon key={i} icon={faPepperHot} />);
    }

    return (
      <div className="question-view">
        <h1 className="question-title">{title}</h1>
        <div className="question-difficulty">{peppers}</div>
        <div className="question-tags">
          {tags.map(tag => (
            <Tag key={`question-tag-${tag.name}`} week={tag.week} name={tag.name} />
          ))}
        </div>
        <div className="question-preamble">
          <Markdown source={preamble} renderers={{ code: CodeBlock }} />
        </div>
        <div className="question-content">{question}</div>
        <div className="question-hints">
          <button
            className={showHints < hints.length ? '' : 'no-hints'}
            type="button"
            onClick={() => {
              // Make next hint available
              this.setState({
                showHints: showHints + 1
              });
            }}
          >
            {showHints === 0 ? 'Show a Hint' : 'Show Another Hint'}
          </button>
          <ol>
            {hints.map((h, ind) => (
              <Hint key={hash(h)} text={h} isShown={ind < showHints} />
            ))}
          </ol>
        </div>
        <div className="question-rubric">
          <button
            type="button"
            onClick={() => {
              this.setState({
                showRubric: !showRubric
              });
            }}
          >
            {showRubric ? 'Hide Rubric' : 'Show Rubric'}
          </button>
          <Rubric isShown={showRubric} text={rubric} />
        </div>
      </div>
    );
  }
}
