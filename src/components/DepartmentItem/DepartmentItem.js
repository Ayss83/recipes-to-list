// @flow

import * as React from "react";
import {connect} from 'react-redux';
import actionTypes from "../../store/actionTypes";

export const DepartmentItem = props => {
  
  const removeIngredient = (ingredientName: string) => {
    if(window.confirm('Are you sure you want to remove this ingredient? (This action can\'t be undone)')) {
      props.onIngredientRemove(ingredientName);
    }
  }

  return(
    <div>
      <h4>{props.departmentName}</h4>
      <ul className="list-group d-flex">
        {props.ingredientList.map(
          ingredient =>
            // Vérification de la correspondance de catégorie
            ingredient.department === props.departmentName ? (
              <li key={ingredient.name} className="list-group-item">
                {ingredient.name + " "}
                {/* Affichage de quantité et unité uniquement si la quantité est supérieure à 0 */}
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
                  <span onClick={() => removeIngredient(ingredient.name)}><i className="fas fa-trash text-danger float-right" /></span>
              </li>
            ) : null
        )}
      </ul>
    </div>
  )
};


const mapDispatchToProps = dispatch => {
  return {
    onIngredientRemove: (ingredientName: string) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        payload: {ingredientToRemove: ingredientName}
      })
  }
}

export default connect(null, mapDispatchToProps)(DepartmentItem);
