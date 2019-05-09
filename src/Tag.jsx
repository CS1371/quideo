import React from 'react';
import PropTypes from 'prop-types';
import './Tag.css';

const COLORS = ['red', 'green', 'blue', 'orange', 'grey', 'random'];

const Tag = props => {
  const { name, color, week, handler } = props;
  let tagColor = '';
  if (color !== 'random') {
    tagColor = color;
  } else if (week > -1) {
    tagColor = COLORS[week % (COLORS.length - 1)];
  } else {
    // Random!
    tagColor = COLORS[Math.floor(Math.random() * (COLORS.length - 1))];
  }
  return (
    <button type="button" className={`tag tag-${tagColor}`} onClick={handler}>
      {name}
    </button>
  );
};

Tag.propTypes = {
  /** the name of this tag */
  name: PropTypes.string.isRequired,
  /** the color class to use. If not given, a random one is chosen */
  color: PropTypes.oneOf(COLORS),
  /** the week to use, for the color. If colors is given, this has no effect */
  week: PropTypes.number,
  /** the URL for this tag to use */
  handler: PropTypes.func
};

Tag.defaultProps = {
  // For random, nothing!
  week: -1,
  color: 'random',
  handler: () => {}
};

export default Tag;
