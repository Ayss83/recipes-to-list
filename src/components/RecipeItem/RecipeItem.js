// @flow

import * as React from "react";
import { Link } from "react-router-dom";
import "./RecipeItem.css";

type Props = {
  recipe: {
    image_name: string,
    instructions: string,
    recipe_id: number,
    servings: number,
    title: string,
    ingredients: [
      {
        display_index: number,
        name: string,
        department: string,
        quantity: number,
        unit: string
      }
    ]
  }
};

const RecipeItem = (props: Props) => (
  <Link to={"/recipes/" + props.recipe.recipe_id}>
    <div className="card">
      <div className="card-title">
        <h5>{props.recipe.title}</h5>
      </div>
      <div className="card-body">
        <img
          src={"/images/" + props.recipe.image_name}
          alt={props.recipe.title}
        />
      </div>
    </div>
  </Link>
);

export default RecipeItem;
