import React from 'react';
import PropTypes from 'prop-types';

import './Difficulty.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPepperHot, faMinusCircle, faPlusCircle } from '@fortawesome/pro-solid-svg-icons';

const Difficulty = props => {
  const { value, onChange } = props;

  const peppers = [];
  for (let i = 0; i <= value; i++) {
    peppers.push(<FontAwesomeIcon icon={faPepperHot} key={i} />);
  }

  const minus = (
    <FontAwesomeIcon icon={faMinusCircle} onClick={() => onChange(Math.max(0, value - 1))} />
  );

  const plus = (
    <FontAwesomeIcon icon={faPlusCircle} onClick={() => onChange(Math.min(4, value + 1))} />
  );

  return (
    <div className="new-difficulty">
      <h2>How difficult is this problem?</h2>
      <div className="difficulty-editor">
        {minus}
        <div className="new-peppers">{peppers}</div>
        {plus}
      </div>
    </div>
  );
};

Difficulty.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Difficulty;
