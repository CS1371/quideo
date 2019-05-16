import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { Tag } from '../question-viewer';
import './TagChooser.css';

export default class TagChooser extends React.Component {
  static propTypes = {
    availableTags: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        week: PropTypes.number
      })
    ).isRequired,
    value: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        week: PropTypes.number
      })
    ).isRequired,
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

    const tag = this.possibleTags.filter(
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

  render() {
    const { value, onChange } = this.props;
    const { searchTerm } = this.state;

    const isValid =
      this.possibleTags().filter(
        t => t.name.localeCompare(searchTerm, 'en', { sensitivity: 'base' }) === 0
      ).length !== 0;
    return (
      <div className="tag-search">
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
        {value.length !== 0 ? <hr /> : null}
        <div className={`tag-selector ${isValid ? 'is-valid' : ''}`}>
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
      </div>
    );
  }
}
