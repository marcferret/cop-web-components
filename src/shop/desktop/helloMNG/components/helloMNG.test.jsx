import React from 'react';
import { shallow } from 'enzyme';
import HelloMNG from './helloMNG';
import HelloMNGService from '../services/helloMNG';
import helloMNGData from '../__mocks__/helloMNG';

const wait = () => new Promise(resolve => setImmediate(resolve));

HelloMNGService.getMessage = jest.fn(() => Promise.resolve(helloMNGData));

describe('helloMNG component', () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(<HelloMNG />);
    await wait();
    wrapper.update();
  });

  it('Displays message: Hello Mango!', async () => {
    expect(wrapper.find('.title').text()).toBe('Hello MANGO!');
  });
});
