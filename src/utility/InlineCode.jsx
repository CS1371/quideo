import React from 'react';
import PropTypes from 'prop-types';
import hash from 'object-hash';
import Blank from './Blank';

const InlineCode = props => {
  // Just use same as before. If we find the input, do it.
  const { value } = props;
  if (value === null || value.length === 0) {
    return null;
  }
  // If NO blanks, just return our value
  if (value.indexOf('~~!') === -1 || value.indexOf('!~~') === -1) {
    return <code key={hash(value)}>{value}</code>;
  }
  // if we find none, just return normal...?
  const grouped = [...value.matchAll(/(.*?)~~!([^~]+)!~~(.*?)/g)];

  const tmp = grouped.map((v, i) => {
    return (
      <React.Fragment key={hash(v)}>
        <code>{v[1]}</code>
        <Blank key={hash(v[2] + i)} value={v[2]} />
        <code>{v[3]}</code>
      </React.Fragment>
    );
  });
  // It's possible we'll miss the last one. Handle accordingly
  // Find last !~~; everything after that should engage?
  const last = value.slice(value.lastIndexOf('!~~') + 3);
  tmp.push(<code key={hash(last)}>{last}</code>);
  return tmp;
};

InlineCode.propTypes = {
  value: PropTypes.string
};

InlineCode.defaultProps = {
  value: ''
};

export default InlineCode;
