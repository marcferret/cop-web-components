import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import HelloMNG from './components/helloMNG';

// CSS Styles
require('../../../../style/shop/desktop/helloMNG/styles.scss');

ReactDOM.render(
  <HelloMNG />
  , document.querySelector('#helloMNG'),
);
