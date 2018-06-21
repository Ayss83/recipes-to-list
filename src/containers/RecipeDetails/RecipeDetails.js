// @flow

import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import recipes from "../../recipes/recipes";
import type { recipe } from "../../recipes/recipes";
import "./RecipeDetails.css";
import actionTypes from "../../store/actionTypes";

type Props = {
  match: {
    params: {
      recipe_id: string
    }
  },
  onIngredientsAdd: (ingredientsList: Array<Object>) => void
};

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

  //Ajoute la liste d'ingrédients de la recette au store Redux et affiche une alerte
  addIngredients = () => {
    this.props.onIngredientsAdd(this.state.recipe.ingredients);
    const alertMsg: HTMLElement = document.querySelector(".alert");
    const alertLink: HTMLElement = document.querySelector(".alert-link");
    alertMsg.classList.remove("d-none");
    alertMsg.classList.add("show");
    alertLink.classList.remove("d-none");

    setTimeout(() => {
      alertMsg.classList.remove("show");
      setTimeout(() => {
        alertMsg.classList.add("d-none");
        alertLink.classList.add("d-none");
      }, 1000);
    }, 5000);
  };

  render() {
    return this.state.recipeFound ? (
      <div className="container">
        <div className="float-md-right d-flex justify-content-center">
          <img
            className="recipe-img rounded shadow"
            src={"/images/" + this.state.recipe.image_name}
            alt={this.state.recipe.image_name}
          />
        </div>
        <h3>{this.state.recipe.title}</h3>
        <div>
          <p className="font-italic">
            For {this.state.recipe.servings}{" "}
            {this.state.recipe.servings > 1 ? "people" : "person"}
          </p>
          <ul>
            <strong>Ingredients List</strong>
            {this.state.recipe.ingredients.map(ingredient => (
              <li key={ingredient.display_index}>
                {ingredient.name + " "}
                {ingredient.quantity > 0
                  ? Math.round(ingredient.quantity * 100) / 100 + " "
                  : null}
                {ingredient.quantity > 0
                  ? ingredient.unit
                    ? ingredient.unit
                    : ingredient.quantity > 1
                      ? "pcs"
                      : "pc"
                  : null}
              </li>
            ))}
          </ul>
          {this.state.recipe.instructions.split("\r\n\r\n").map(paragraph => (
            <p key={paragraph.slice(12)} className="text-justify">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-success btn-lg btn-add"
            onClick={() => this.addIngredients()}
          >
            Add ingredients to your shopping list
          </button>
        </div>
        <div className="alert alert-success fixed-bottom m-auto fade add-alert">
          Ingredients added to your shopping List successfully!{" "}
          <Link className="alert-link d-none" to="/shopping-list">
            Go to your shopping list
          </Link>
        </div>
      </div>
    ) : (
      <p>Loading...</p>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientsAdd: (ingredientsList: Array<Object>) =>
      dispatch({
        type: actionTypes.ADD_INGREDIENTS,
        payload: { ingredients: ingredientsList }
      })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(RecipeDetails);
