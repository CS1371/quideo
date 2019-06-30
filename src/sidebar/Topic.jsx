import React from 'react';
import PropTypes from 'prop-types';

const Topic = props => {
  const { name, numQuestions } = props;
  return (
    <div className="sidebar-topic">
      <h2>{name}</h2>
    </div>
  );
};

Topic.propTypes = {
  name: PropTypes.string.isRequired,
  numQuestions: PropTypes.number
};

Topic.defaultProps = {
  numQuestions: 10
};

export default Topic;
