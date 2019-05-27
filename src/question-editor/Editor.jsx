import React from 'react';
import PropTypes from 'prop-types';
import { Question } from '../question-viewer';
import { TYPES } from '../utility';
import MarkdownEditor from './MarkdownEditor';
import PartEditor from './PartEditor';
import Difficulty from './Difficulty';
import TagChooser from './TagChooser';

import './Editor.css';

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
      difficulty: 0,
      showPreview: false
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

  renderPreview = () => {
    const { tags, difficulty, rubric, preamble, confirmed, showPreview } = this.state;
    if (tags.length === 0) {
      return null;
    }
    const toggler = (
      <button
        type="button"
        className="preview-btn"
        onClick={() => this.setState({ showPreview: !showPreview })}
      >
        {showPreview ? 'Hide Preview' : 'Show Preview'}
      </button>
    );
    if (!showPreview) {
      return toggler;
    }
    return (
      <div className="question-preview">
        {toggler}
        <h2>Preview</h2>
        <Question
          primaryTag={tags[0]}
          tags={tags.slice(1)}
          preamble={preamble}
          rubric={rubric}
          difficulty={difficulty + 1}
          questions={confirmed}
        />
      </div>
    );
  };

  render() {
    const { confirmed, difficulty, rubric } = this.state;
    return (
      <div className="question-editor">
        <h1>Question Editor</h1>
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
        {this.renderPreview()}
      </div>
    );
  }
}
