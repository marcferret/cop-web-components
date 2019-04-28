import React from 'react';
import ReactDOM from 'react-dom';
import HelloWebComponent from './components/helloWebComponent';

class RenderHelloWebComponent extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('div');
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);

    ReactDOM.render(
      <HelloWebComponent />,
      mountPoint,
    );
  }
}

window.customElements.define('hello-web-component', RenderHelloWebComponent);
