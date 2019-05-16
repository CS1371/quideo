import React from 'react';
import PropTypes from 'prop-types';
import hash from 'object-hash';
import './TypeChooser.css';

const TypeChooser = props => {
  const { availableTypes, value, onChange } = props;
  return (
    <div className="question-type">
      <p>I am making a...</p>
      <div className="type-buttons">
        {availableTypes.map(t => (
          <button
            key={hash(t)}
            type="button"
            className={value === t ? 'type-selected' : ''}
            onClick={() => onChange(t)}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
};

TypeChooser.propTypes = {
  availableTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func
};

TypeChooser.defaultProps = {
  onChange: () => {}
};

export default TypeChooser;
