import React from 'react';
import PropTypes from 'prop-types';
import TagChooser from './TagChooser';
import TypeChooser from './TypeChooser';
import MarkdownEditor from './MarkdownEditor';
import { TYPES } from '../question-viewer';
import MultipleChoice from './MultipleChoice';
import CodingAnswer from './CodingAnswer';
import './Editor.css';

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
  save = () => {
    console.log(this.state);
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
          prompts: null,
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
    switch (type) {
      case TYPES.MC:
        help =
          "Here you'll write your question; you'll write the possible answers in the next step";
        specifics = (
          <MultipleChoice
            value={answers}
            onChange={v => {
              this.setState({
                answers: v
              });
            }}
          />
        );
        break;
      case TYPES.SA:
        help =
          "While this isn't a question, here you can provide a setup for each of the part(s) you will write in the next step";
        break;
      case TYPES.FB:
        help = "Here you'll the complete question, with blanks written as <>";
        break;
      case TYPES.CA:
        help = "Here you'll give the complete coding question, with all the test cases, etc.";
        specifics = (
          <CodingAnswer
            value={answers}
            onChange={v => {
              this.setState({
                answers: v
              });
            }}
          />
        );
        break;
      default:
        break;
    }
    return (
      <div className={`specific-editor ${specifics === null ? 'editor-hide' : 'editor-show'}`}>
        <MarkdownEditor
          value={preamble}
          title={type}
          help={help}
          onChange={val => {
            this.setState({
              preamble: val
            });
          }}
        />
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
