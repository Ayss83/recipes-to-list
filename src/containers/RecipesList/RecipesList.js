import * as React from 'react';

import RecipeItem from '../../components/RecipeItem/RecipeItem';
import recipes from '../../recipes/recipes';

class RecipesList extends React.Component {
  state = {
    recipes: recipes
  }

  render() {
    return (
      <div className="container d-flex flex-wrap justify-content-center">
        {this.state.recipes.map((recipe: any) => (
          <RecipeItem recipe={recipe} key={recipe.recipe_id} />
        ))}
      </div>
    )
  }
}

export default RecipesList;