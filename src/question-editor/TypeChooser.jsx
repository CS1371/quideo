import React from 'react';
import PropTypes from 'prop-types';
import hash from 'object-hash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/pro-light-svg-icons';
import './TypeChooser.css';

const TypeChooser = props => {
  const { availableTypes, value, onChange } = props;
  return (
    <div className="question-type">
      <p>What type of problem are we making today?</p>
      <div className="type-buttons">
        {availableTypes.map(t => (
          <button
            key={hash(t)}
            type="button"
            className={value === t ? 'type-selected' : ''}
            onClick={() => onChange(t)}
          >
            {value === t ? <FontAwesomeIcon icon={faCheckCircle} /> : null}
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
  onChange: PropTypes.func.isRequired
};

export default TypeChooser;
