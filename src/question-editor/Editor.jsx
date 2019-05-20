import React from 'react';
import PropTypes from 'prop-types';
import TagChooser from './TagChooser';
import TypeChooser from './TypeChooser';
import MarkdownEditor from './MarkdownEditor';
import { TYPES } from '../question-viewer';
import MultipleChoice from './MultipleChoice';
import CodingAnswer from './CodingAnswer';
import ShortAnswer from './ShortAnswer';
import './Editor.css';
import Blanks from './Blanks';

export default class Editor extends React.Component {
  static propTypes = {
    availableTags: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        week: PropTypes.number
      })
    ).isRequired,
    availableTypes: PropTypes.arrayOf(PropTypes.string).isRequired
  };

  constructor(props) {
    super(props);

    // What do we need to keep
    this.state = {
      tags: [],
      type: '',
      preamble: '',
      prompts: [],
      answers: [],
      hints: [],
      rubric: '',
      difficulty: 0
    };
  }

  // We choose to structure this like classic react controls:
  // Every component has an "onChange" and "value" prop - we feed
  // the value and give it an onChange!
  //
  // The key is that WE store everything here - NOT in individual components
  // That way we can submit when ready from here.
  //
  // For SA and FB, we'll need to redefine prompts to ->prompts, answers
  save = () => {
    console.log(this.state);
  };

  onPreamble = preamble => {
    const { type, preamble: prePreamble, answers: preAnswers } = this.state;
    const prompts = [];
    const answers = [];
    if (type === TYPES.FB) {
      // check that count has changed before we do anything...
      const oldCount = (prePreamble.match(/<\\>/g) || []).length;
      const count = (preamble.match(/<\\>/g) || []).length;
      for (let i = 0; i < count; i++) {
        prompts.push(`Prompt #${i + 1}`);
      }
      for (let i = 0; i < oldCount; i++) {
        answers.push(preAnswers[i]);
      }
      for (let i = oldCount; i < count; i++) {
        answers.push('');
      }
      answers.length = count;
    }
    this.setState({
      preamble,
      prompts,
      answers
    });
  };

  setType = t => {
    switch (t) {
      case TYPES.MC:
        this.setState({
          type: t,
          prompts: null,
          answers: []
        });
        break;
      case TYPES.SA:
        this.setState({
          type: t,
          prompts: [],
          answers: []
        });
        break;
      case TYPES.FB:
        this.setState({
          type: t,
          prompts: [],
          answers: []
        });
        break;
      case TYPES.CA:
        this.setState({
          type: t,
          prompts: null,
          answers: ''
        });
        break;
      default:
        this.setState({
          type: t,
          prompts: null,
          answers: null
        });
    }
  };

  renderQuestion = () => {
    const { type, preamble, prompts, answers } = this.state;
    let help = '';
    let specifics = null;
    const onChange = v => {
      this.setState({
        answers: v
      });
    };
    switch (type) {
      case TYPES.MC:
        help =
          'Here you will write your question. You will write the possible answers in the next step';
        specifics = <MultipleChoice value={answers} onChange={onChange} />;
        break;
      case TYPES.SA:
        help = 'Here you can provide a setup for each of the part(s) you will write below';
        specifics = <ShortAnswer value={answers} onChange={onChange} />;
        break;
      case TYPES.FB: {
        help = "Here you'll write the complete question, with blanks written as <\\>";
        specifics = <Blanks prompts={prompts} value={answers} onChange={onChange} />;
        break;
      }
      case TYPES.CA:
        help = "Here you'll give the complete coding question, with all the test cases, etc.";
        specifics = <CodingAnswer value={answers} onChange={onChange} />;
        break;
      default:
        break;
    }
    return (
      <div className={`specific-editor ${specifics === null ? 'editor-hide' : 'editor-show'}`}>
        <MarkdownEditor value={preamble} title={type} help={help} onChange={this.onPreamble} />
        {specifics}
      </div>
    );
  };

  render() {
    const { tags, type, hints, rubric, difficulty } = this.state;
    const { availableTags, availableTypes } = this.props;

    // Order:
    // 1. What is this question about? (Tags)
    // 2. What type is the question? (Type)
    // 3. What is the preamble? (Preamble)
    // 4a. If MC, Get answers
    //    Is this correct?
    //    What's the answer
    //    Explain yourself
    // 4b. If CA, Get answer
    //    Only code
    // 4c. If SA, Get prompt answer pairs
    //    Prompt and Answer
    // 5. Any hints? (Hints)
    // 6. Rubric
    // 7. Difficulty

    // For all, we need preamble -> own component?
    // sort tags by week
    const tagSorter = (t1, t2) => t1.week - t2.week;
    availableTags.sort(tagSorter);
    const topic = tags.length === 0 ? '' : tags[0].name;
    let title = '';
    if (topic === '' && type === '') {
      title = 'Question Editor';
    } else if (topic === '') {
      title = `Question Editor: ${type}`;
    } else if (type === '') {
      title = `Question Editor: ${topic}`;
    } else {
      title = `Question Editor: ${topic} - ${type}`;
    }

    return (
      <div className="question-editor">
        <h1>{title}</h1>
        <TagChooser
          availableTags={availableTags}
          value={tags}
          onChange={val => {
            this.setState({
              tags: val
            });
          }}
        />
        <TypeChooser availableTypes={availableTypes} value={type} onChange={this.setType} />
        {this.renderQuestion()}
        <button type="button" onClick={this.save}>
          Save
        </button>
      </div>
    );
  }
}
