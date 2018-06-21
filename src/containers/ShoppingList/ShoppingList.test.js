import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ShoppingList } from './ShoppingList';
// import { DepartmentItem } from '../../components/DepartmentItem/DepartmentItem';


configure({adapter: new Adapter()});

describe('<ShoppingList />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ShoppingList />)
  });

  it('should exist', () => {

  });
});