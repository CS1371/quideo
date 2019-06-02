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
  const grouped = [...value.matchAll(/(.*?)~~!([^~]+)!~~(.*?)/g)];
  const tmp = grouped.map((v, i) => {
    return (
      <React.Fragment key={hash(v)}>
        <span key={hash(v[1] + i)}>{v[1]}</span>
        <Blank key={hash(v[2] + i)} value={v[2]} />
        <span key={hash(v[3] + i)}>{v[3]}</span>
      </React.Fragment>
    );
  });
  // It's possible we'll miss the last one. Handle accordingly
  // Find last !~~; everything after that should engage?
  const last = value.slice(value.lastIndexOf('!~~') + 3);
  tmp.push(
    <React.Fragment key={hash(last)}>
      <span key={hash(last)}>{last}</span>
    </React.Fragment>
  );
  return <React.Fragment>{tmp}</React.Fragment>;
};

InlineCode.propTypes = {
  value: PropTypes.string
};

InlineCode.defaultProps = {
  value: ''
};

export default InlineCode;
