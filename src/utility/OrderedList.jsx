import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimesSquare,
  faChevronSquareUp,
  faChevronSquareDown
} from '@fortawesome/pro-solid-svg-icons';
import './OrderedList.css';

const onSwap = (a, b, value, onChange) => {
  if (a < 0 || a >= value.length || b < 0 || b >= value.length) {
    return;
  }
  // eslint-disable-next-line no-param-reassign
  [value[a], value[b]] = [value[b], value[a]];
  onChange(value);
};

const onRemove = (i, value, onChange) => {
  if (i < 0 || i >= value.length) {
    return;
  }
  value.splice(i, 1);
  onChange(value);
};

const renderMovers = (i, children, onChange) => {
  const moveModifier = `${i === 0 ? 'no-up' : ''} ${i === children.length - 1 ? 'no-down' : ''}`;
  return (
    <div className={`list-movers ${moveModifier}`}>
      <FontAwesomeIcon
        key="move-up"
        icon={faChevronSquareUp}
        onClick={() => {
          onSwap(i, i - 1, children, onChange);
        }}
      />
      <FontAwesomeIcon
        key="move-down"
        icon={faChevronSquareDown}
        onClick={() => {
          onSwap(i, i + 1, children, onChange);
        }}
      />
    </div>
  );
};

const renderChildren = props => {
  const { children, render, onChange } = props;
  return children.map((n, i) => {
    const child = render(n, i);
    // for each child, map with the FA, the x, and the item itself
    return (
      <div key={child.key} className="list-item">
        {renderMovers(i, children, onChange)}
        {child}
        <FontAwesomeIcon
          icon={faTimesSquare}
          onClick={() => {
            onRemove(i, children, onChange);
          }}
        />
      </div>
    );
  });
};

const OrderedList = props => {
  const { children, render, onChange } = props;
  return <React.Fragment>{renderChildren({ children, render, onChange })}</React.Fragment>;
};

OrderedList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.array.isRequired,
  render: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default OrderedList;
