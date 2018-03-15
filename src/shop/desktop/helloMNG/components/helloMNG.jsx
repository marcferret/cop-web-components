import React from 'react';
import HelloMNGService from '../services/helloMNG';

export default class HelloMNG extends React.Component {
  constructor() {
    super();

    this.state = {
      message: '',
    };
  }

  async componentWillMount() {
    const helloMNG = await HelloMNGService.getMessage();
    this.setState({ message: helloMNG.message });
  }

  render() {
    return (
      <h1 className="title">{this.state.message}</h1>
    );
  }
}
