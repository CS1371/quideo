import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { Tag } from '../question-viewer';
import { Tag as TagShape } from '../utility';

import './TagChooser.css';

export default class TagChooser extends React.Component {
  static propTypes = {
    availableTags: PropTypes.arrayOf(TagShape).isRequired,
    primaryTag: TagShape,
    tags: PropTypes.arrayOf(TagShape).isRequired,
    onChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    primaryTag: null
  };

  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      showShrug: false
    };
  }

  possibleTags = () => {
    const { availableTags, primaryTag, tags } = this.props;
    const combine = tags.concat(primaryTag === null ? [] : primaryTag);
    return availableTags.filter(t => !combine.map(v => v.name).includes(t.name));
  };

  addTag = () => {
    // If we have valid tag, make it!
    const { primaryTag, tags, onChange } = this.props;
    const { searchTerm } = this.state;

    if (searchTerm.localeCompare('shrug', 'en', { sensitivity: 'base' }) === 0) {
      // Hannah, this one's for you
      this.setState({ showShrug: true });
    }

    const tag = this.possibleTags().filter(
      t => t.name.localeCompare(searchTerm, 'en', { sensitivity: 'base' }) === 0
    );
    // if we don't have a tag, just die
    if (tag.length === 0) {
      return;
    }
    // Now, if we do NOT have a primary tag, this is our ticket
    if (primaryTag === null) {
      onChange({ primaryTag: tag[0], tags });
    } else {
      onChange({ primaryTag, tags: tags.concat(tag) });
    }
    this.setState({ searchTerm: '' });
  };

  renderChosen = () => {
    const { primaryTag, tags, onChange } = this.props;
    return (
      <div className={`selected-tags ${primaryTag !== null ? 'is-primary' : ''}`}>
        {primaryTag === null ? null : (
          <Tag
            {...primaryTag}
            key={primaryTag.name}
            handler={() => {
              onChange({ primaryTag: null, tags });
            }}
          />
        )}
        {tags.map((tag, i) => {
          return (
            <Tag
              {...tag}
              key={tag.name}
              handler={() => {
                onChange({ primaryTag, tags: tags.splice(i, 1) });
              }}
            />
          );
        })}
      </div>
    );
  };

  renderSelector = () => {
    const { searchTerm, showShrug } = this.state;
    const { primaryTag } = this.props;
    const isValid =
      this.possibleTags().some(
        t => t.name.localeCompare(searchTerm, 'en', { sensitivity: 'base' }) === 0
      ) || searchTerm.localeCompare('shrug', 'en', { sensitivity: 'base' }) === 0;

    return (
      <div className={`tag-selector ${isValid ? 'is-valid' : ''}`}>
        <p>{showShrug ? 'Have a shrug for the road...¯\\_(ツ)_/¯' : null}</p>
        <p>
          {primaryTag === null
            ? 'What is this problem primarily about?'
            : 'Anything else related to this problem? (Click a tag to remove it)'}
        </p>
        <input
          list="possibleTags"
          placeholder="Type a tag name..."
          value={searchTerm}
          onChange={e => this.setState({ searchTerm: e.target.value })}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              this.addTag();
            }
          }}
        />
        <datalist id="possibleTags">
          {this.possibleTags().map(tag => (
            <option key={tag.name} value={tag.name} />
          ))}
        </datalist>
        <button
          className="tag-add-btn"
          type="button"
          onClick={() => this.addTag()}
          disabled={!isValid}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    );
  };

  render() {
    const { primaryTag, tags } = this.props;

    return (
      <div className="tag-search">
        {this.renderChosen()}
        {primaryTag !== null || tags.length !== 0 ? <hr /> : null}
        {this.renderSelector()}
      </div>
    );
  }
}
