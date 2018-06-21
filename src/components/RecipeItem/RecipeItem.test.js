import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RecipeItem from './RecipeItem';
import recipes from '../../recipes/recipes';

configure({adapter: new Adapter()});

describe('<RecipeItem />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<RecipeItem recipe={recipes[0]} />)
  })

  it('should display recipe\'s title as h5', () => {
    expect(wrapper.find('h5').text()).toEqual(recipes[0].title);
  });

  it('should display recipe\'s image', () => {
    expect(wrapper.find('img').props().src).toMatch(recipes[0].image_name);
  });

  it('should need a recipe property', () => {
    const fn = () => {
      wrapper.setProps({recipe: null});
    }
    expect(fn).toThrow();
  });
});