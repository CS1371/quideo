import React from 'react';

import Topic from './Topic';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <p>Hello, World</p>
      <Topic name="hello, world!" />
    </div>
  );
};

export default Sidebar;
