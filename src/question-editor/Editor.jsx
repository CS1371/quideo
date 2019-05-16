import React from 'react';
import PropTypes from 'prop-types';
import TagChooser from './TagChooser';

export default class Editor extends React.Component {
  static propTypes = {
    availableTags: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        week: PropTypes.number
      })
    ).isRequired
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
    const { availableTags } = this.props;

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
    return (
      <TagChooser
        availableTags={availableTags}
        value={tags}
        onChange={val => {
          this.setState({
            tags: val
          });
        }}
      />
    );
  }
}
