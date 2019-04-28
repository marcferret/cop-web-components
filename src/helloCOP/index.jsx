import React from 'react';
import ReactDOM from 'react-dom';
import HelloCOP from './components/helloCOP';

// CSS Styles
require('./components/helloCOP.scss');

ReactDOM.render(
  <HelloCOP />,
  document.querySelector('#helloCOP'),
);
