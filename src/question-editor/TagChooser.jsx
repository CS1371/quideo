import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from '../question-viewer';

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

  render() {
    const { availableTags, value, onChange } = this.props;
    const { searchTerm } = this.state;

    // Get effectively available tags
    const possibleTags = availableTags.filter(tag1 => !value.map(v => v.name).includes(tag1.name));
    return (
      <div className="tag-search">
        <div className="selected-tags">
          {value.map(tag => {
            return (
              <Tag
                {...tag}
                handler={() => {
                  onChange(value.filter(v => v.name !== tag.name));
                }}
              />
            );
          })}
        </div>
        <div className="tag-selector">
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
                // If we have valid tag, make it!
                const tag = possibleTags.filter(
                  t => t.name.localeCompare(searchTerm, 'en', { sensitivity: 'base' }) === 0
                );
                if (tag.length !== 0) {
                  // we have one! engage
                  onChange(value.concat(tag));
                  this.setState({
                    searchTerm: ''
                  });
                }
              }
            }}
          />
          <datalist id="possibleTags">
            {possibleTags.map(tag => (
              <option key={tag.name} value={tag.name} />
            ))}
          </datalist>
        </div>
        <Tag
          name="hi"
          week={1}
          handler={() => {
            onChange(value.filter(v => v.name !== 'hi'));
          }}
        />
      </div>
    );
  }
}
