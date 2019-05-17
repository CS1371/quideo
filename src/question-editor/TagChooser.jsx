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
    value: PropTypes.arrayOf(TagShape).isRequired,
    onChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      searchTerm: ''
    };
  }

  possibleTags = () => {
    const { availableTags, value } = this.props;
    return availableTags.filter(tag1 => !value.map(v => v.name).includes(tag1.name));
  };

  addTag = () => {
    // If we have valid tag, make it!
    const { value, onChange } = this.props;
    const { searchTerm } = this.state;

    const tag = this.possibleTags().filter(
      t => t.name.localeCompare(searchTerm, 'en', { sensitivity: 'base' }) === 0
    );
    if (tag.length !== 0) {
      // we have one! engage
      onChange(value.concat(tag));
      this.setState({
        searchTerm: ''
      });
    }
  };

  renderChosen = () => {
    const { value, onChange } = this.props;
    return (
      <div className="selected-tags">
        {value.map(tag => {
          return (
            <Tag
              {...tag}
              key={tag.name}
              handler={() => {
                onChange(value.filter(v => v.name !== tag.name));
              }}
            />
          );
        })}
      </div>
    );
  };

  renderSelector = () => {
    const { searchTerm } = this.state;
    const { value } = this.props;

    const isValid =
      this.possibleTags().filter(
        t => t.name.localeCompare(searchTerm, 'en', { sensitivity: 'base' }) === 0
      ).length !== 0;

    return (
      <div className={`tag-selector ${isValid ? 'is-valid' : ''}`}>
        <p>
          {value.length === 0
            ? 'What is this problem primarily about?'
            : 'Anything else related to this problem?'}
        </p>
        <input
          list="possibleTags"
          placeholder="Type a tag name..."
          value={searchTerm}
          onChange={e => {
            this.setState({
              searchTerm: e.target.value
            });
          }}
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
        <button type="button" onClick={() => this.addTag()} disabled={!isValid}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    );
  };

  render() {
    const { value } = this.props;

    return (
      <div className="tag-search">
        {this.renderChosen()}
        {value.length !== 0 ? <hr /> : null}
        {this.renderSelector()}
      </div>
    );
  }
}
