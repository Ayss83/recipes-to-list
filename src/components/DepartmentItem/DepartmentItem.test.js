import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { DepartmentItem } from './DepartmentItem';

configure({adapter: new Adapter()});

describe('<DepartmentItem />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<DepartmentItem departmentName="Test Department" ingredientList={[{name: "butter", department: 'Test Department'}, {name: "bread", department: 'Bakery'}]}/>)
  });

  it('should display department name as a h4', () => {
    expect(wrapper.find('h4').text()).toEqual("Test Department");
  });

  it('should display a list of ingredients with corresponding department', () => {
    expect(wrapper.find('li').text()).toMatch('butter');
    wrapper.setProps({departmentName: "Bakery"});
    expect(wrapper.find('li').text()).toMatch('bread');
  });
});