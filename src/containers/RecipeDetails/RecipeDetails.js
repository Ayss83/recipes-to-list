// @flow

import * as React from "react";
import { connect } from 'react-redux';

import recipes from "../../recipes/recipes";
import type {recipe} from '../../recipes/recipes';

type Props = {
  match: {
    params: {
      recipe_id: string
    }
  },
  onIngredientsAdd: (ingredientsList: Array<Object>) => void
}

type State = {
  recipesList: Array<recipe>,
  recipe: recipe,
  recipeFound: boolean
};

class RecipeDetails extends React.Component<Props, State> {
  state = {
    recipesList: [],
    recipe: {
      image_name: "",
      instructions: "",
      recipe_id: -1,
      servings: 0,
      title: "",
      ingredients: []
    },
    recipeFound: false
  };

  componentWillMount() {
    this.setState({ recipesList: recipes }, () => {
      const currentRecipe = this.state.recipesList.find(
        elem => elem.recipe_id === Number(this.props.match.params.recipe_id)
      );
      this.setState({ recipe: currentRecipe, recipeFound: true });
    });
  }

  render() {
    return this.state.recipeFound ? (
      <div className="container">
        <img
          className="float-right img-rounded"
          src={"/images/" + this.state.recipe.image_name}
          alt={this.state.recipe.image_name}
        />
        <h3>{this.state.recipe.title}</h3>
        <div>
          <p>
            For {this.state.recipe.servings}{" "}
            {this.state.recipe.servings > 1 ? "people" : "person"}
          </p>
          <ul>
            <strong>Ingredients List</strong>
            {this.state.recipe.ingredients.map(
              ingredient =>
                ingredient.quantity > 0 ? (
                  <li key={ingredient.display_index}>
                    {ingredient.name}{" "}
                    {Math.round(ingredient.quantity * 100) / 100}{" "}
                    {ingredient.unit
                      ? ingredient.unit
                      : ingredient.quantity > 1
                        ? "pcs"
                        : "pc"}
                  </li>
                ) : null
            )}
          </ul>
          {this.state.recipe.instructions
            .split("\r\n\r\n")
            .map(paragraph => <p key={paragraph.slice(12)} className="text-justify">{paragraph}</p>)}
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn btn-success btn-lg" onClick={() => this.props.onIngredientsAdd(this.state.recipe.ingredients)}>Add ingredients to your shopping list</button>
        </div>
        <div className="alert alert-success fixed-bottom w-50 m-auto d-none" role="alert">
  This is a success alert—check it out!
</div>
      </div>
    ) : (
      <p>Loading...</p>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientsAdd: ingredientsList => dispatch({type: 'ADD_INGREDIENTS', payload: {ingredients: ingredientsList}})
  }
}

export default connect(null, mapDispatchToProps)(RecipeDetails);
