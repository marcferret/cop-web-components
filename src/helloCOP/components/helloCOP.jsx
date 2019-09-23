import React from 'react';

export default class HelloCOP extends React.Component {
  constructor() {
    super();

    this.state = {
      message: 'Hello COP',
    };
  }

  render() {
    const { message } = this.state;
    return (
      <React.Fragment>
        <h1 className="title">{message}</h1>
        <hello-web-component />
      </React.Fragment>
    );
  }
}
