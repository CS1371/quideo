import React from 'react';
import { withRouter } from 'react-router';
import RouteTypes from 'react-router-prop-types';

import Topic from './Topic';
import './Sidebar.css';

const Sidebar = () => {
  const RouteButton = withRouter(props => (
    <button
      type="button"
      onClick={() => {
        if (props.location.pathname.endsWith('editor')) {
          props.history.push('/question');
        } else {
          props.history.push('/editor');
        }
      }}
    >
      {props.location.pathname.endsWith('editor') ? 'Change to Viewer' : 'Change to Editor'}
    </button>
  ));
  RouteButton.propTypes = {
    history: RouteTypes.history.isRequired,
    location: RouteTypes.location.isRequired
  };
  return (
    <div className="sidebar">
      <p>Hello, World</p>
      <Topic name="hello, world!" />
      <RouteButton />
    </div>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
