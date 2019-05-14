import React from 'react';
import PropTypes from 'prop-types';
import hash from 'object-hash';
import Hint from './Hint';
import './HintList.css';

export default class HintList extends React.Component {
  static propTypes = {
    hints: PropTypes.arrayOf(PropTypes.string).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      showHints: 0
    };
  }

  render() {
    const { showHints } = this.state;
    const { hints } = this.props;
    return (
      <React.Fragment>
        <button
          className={showHints < hints.length ? 'btn-hint' : 'btn-no-hint'}
          type="button"
          onClick={() => {
            // Make next hint available
            this.setState({
              showHints: showHints + 1
            });
          }}
        >
          {showHints === 0 ? 'Show a Hint' : 'Show Another Hint'}
        </button>
        <ol>
          {hints.map((h, ind) => (
            <Hint key={hash(h)} text={h} isShown={ind < showHints} />
          ))}
        </ol>
      </React.Fragment>
    );
  }
}