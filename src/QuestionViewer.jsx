import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPepperHot } from '@fortawesome/free-solid-svg-icons';
import CodeBlock from './CodeBlock';
import './QuestionViewer.css';
import MultipleChoice from './MultipleChoice';

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
      'CA' // Coding Answer
    ]).isRequired,
    /** The hints, which is just a string array in the order they should be given */
    hints: PropTypes.arrayOf(PropTypes.string).isRequired,
    /** The question prompts, only for SA */
    prompts: PropTypes.arrayOf(PropTypes.string),
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
      showRubric: false
    };
  }
  // Some stuff is common, some not so much. We print the common stuff,
  // feed the other stuff accordingly!

  render() {
    const { index, tags, rubric, preamble, difficulty, type, hints, prompts, answers } = this.props;
    const { showRubric } = this.state;
    tags.sort((a, b) => a.week - b.week);
    // const tags = this.props.tags.map((tag) => <Tag key={"question-tag-" + tag.name} name={tag.name} />);

    let title = '';
    let question = null;
    switch (type) {
      case 'MC':
        question = <MultipleChoice answers={answers} />;
        title = `${index}: ${tags[tags.length - 1].name} - Multiple Choice`;
        break;
      case 'SA':
        title = `${index}: ${tags[tags.length - 1].name} - Short Answer`;
        break;
      case 'FB':
        title = `${index}: ${tags[tags.length - 1].name} - Fill in the Blank`;
        break;
      case 'LA':
        title = `${index}: ${tags[tags.length - 1].name} - Long Answer`;
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
        <div className="question-preamble">
          <Markdown source={preamble} renderers={{ code: CodeBlock }} />
        </div>
        <div className="question-content">{question}</div>
        <div className="question-hints">{hints}</div>
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
          <Markdown
            className={`rubric-text ${showRubric ? 'rubric-show' : ''}`}
            source={rubric}
            renderers={{ code: CodeBlock }}
          />
        </div>
      </div>
    );
  }
}
