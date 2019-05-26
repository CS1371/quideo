import React from 'react';
import PropTypes from 'prop-types';
import MarkdownEditor from './MarkdownEditor';
import PartEditor from './PartEditor';
import Difficulty from './Difficulty';
import TagChooser from './TagChooser';
import { TYPES } from '../utility';

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

    this.state = {
      tags: [],
      preamble: '',
      confirmed: [],
      rubric: '',
      difficulty: 0
    };
  }

  renderIntro = () => {
    const { tags, preamble } = this.state;
    const { availableTags } = this.props;
    return (
      <React.Fragment>
        <TagChooser
          availableTags={availableTags}
          value={tags}
          onChange={val => {
            this.setState({
              tags: val
            });
          }}
        />
        <MarkdownEditor
          value={preamble}
          title="Preamble"
          help="Optionally provide an introduction to your question - especially useful for multipart questions"
          onChange={v => {
            this.setState({
              preamble: v
            });
          }}
        />
      </React.Fragment>
    );
  };

  render() {
    const { confirmed, difficulty, rubric } = this.state;
    return (
      <div className="question-editor">
        {this.renderIntro()}
        <PartEditor
          availableTypes={Object.values(TYPES)}
          confirmed={confirmed}
          onChange={q => {
            this.setState({
              confirmed: q
            });
          }}
        />
        <MarkdownEditor
          title="Rubric"
          help="Optionally, you can provide a rubric for this problem"
          value={rubric}
          onChange={v => {
            this.setState({ rubric: v });
          }}
        />
        <Difficulty value={difficulty} onChange={v => this.setState({ difficulty: v })} />
      </div>
    );
  }
}
