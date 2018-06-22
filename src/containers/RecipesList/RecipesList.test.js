import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { RecipesList } from './RecipesList';
import recipes from '../../recipes/recipes';

configure({adapter: new Adapter()});

describe('<RecipesList />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<RecipesList />)
  });

  it('should display a child element for each recipe', () => {
    wrapper.setState({recipes: recipes});
    expect(wrapper.children()).toHaveLength(10);
  });
});