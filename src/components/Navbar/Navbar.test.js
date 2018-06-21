import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Navbar from './Navbar';

configure({adapter: new Adapter()});

describe('<Navbar />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Navbar />);
  });

  it('should have 2 links in menu <ul>', () => {
    expect(wrapper.find('ul').children()).toHaveLength(2);
  });

  it('should contain a button for responsive display', () => {
    expect(wrapper.find('button')).toHaveLength(1);
  });
});