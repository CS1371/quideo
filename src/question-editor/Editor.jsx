import React from 'react';
import PropTypes from 'prop-types';
import TagChooser from './TagChooser';
import TypeChooser from './TypeChooser';
import MarkdownEditor from './MarkdownEditor';
import './Editor.css';
import { TYPES } from '../question-viewer';
import MultipleChoice from './MultipleChoice';

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
  save = () => {};

  render() {
    const { tags, type, preamble, prompts, answers, hints, rubric, difficulty } = this.state;
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
    let specifics = null;
    let help = '';
    switch (type) {
      case TYPES.MC:
        help = "Here you'll write your question; you'll write the possible answers in the next step";
        specifics = <MultipleChoice value={answers} onChange={v => 1} />;
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
        break;
      default:
        break;
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
        <TypeChooser
          availableTypes={availableTypes}
          value={type}
          onChange={t => {
            this.setState({
              type: t
            });
          }}
        />
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
  }
}
