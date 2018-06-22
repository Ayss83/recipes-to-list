import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ShoppingList } from './ShoppingList';
import recipes from '../../recipes/recipes';

configure({adapter: new Adapter()});

describe('<ShoppingList />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ShoppingList ingredients={recipes[0].ingredients} />)
  });

  it('should have a categories property in state', () => {
    expect(wrapper.state().categories).not.toBeUndefined();
  });

  it('should retrieve all categories and keep a single instance of each', () => {
    expect(wrapper.state().categories).toHaveLength(3);
  });
});