import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimesSquare,
  faChevronSquareUp,
  faChevronSquareDown
} from '@fortawesome/pro-solid-svg-icons';
import './OrderedList.css';

const renderMovers = (i, onSwap, children) => {
  const moveModifier = `${i === 0 ? 'no-up' : ''} ${i === children.length - 1 ? 'no-down' : ''}`;
  return (
    <div className={`list-movers ${moveModifier}`}>
      <FontAwesomeIcon
        key="move-up"
        icon={faChevronSquareUp}
        onClick={() => {
          if (i - 1 < 0) {
            return;
          }
          onSwap(i, i - 1);
        }}
      />
      <FontAwesomeIcon
        key="move-down"
        icon={faChevronSquareDown}
        onClick={() => {
          if (i + 1 >= children.length) {
            return;
          }
          onSwap(i, i + 1);
        }}
      />
    </div>
  );
};

const renderChildren = props => {
  const { children, onRemove, onSwap } = props;
  return children.map((n, i) => {
    // for each child, map with the FA, the x, and the item itself
    return (
      <div key={n.key} className="list-item">
        {renderMovers(i, onSwap, children)}
        {n}
        <FontAwesomeIcon
          icon={faTimesSquare}
          onClick={() => {
            onRemove(i);
          }}
        />
      </div>
    );
  });
};

const OrderedList = props => {
  const { children, onSwap, onRemove } = props;
  return <React.Fragment>{renderChildren({ children, onSwap, onRemove })}</React.Fragment>;
};

OrderedList.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  onSwap: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default OrderedList;
