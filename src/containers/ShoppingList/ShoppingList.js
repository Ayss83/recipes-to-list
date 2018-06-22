import * as React from "react";
import { connect } from "react-redux";

import DepartmentItem from "../../components/DepartmentItem/DepartmentItem";
import actionTypes from "../../store/actionTypes";

export class ShoppingList extends React.Component {
  state = {
    categories: []
  };

  componentWillMount() {
    const sortedCategories = this.sortCategories();
    this.setState({ categories: sortedCategories });
  }

  componentDidUpdate() {
    const sortedCategories = this.sortCategories();

    // Vérification pour retirer une catégorie en cas de retrait du dernier ingrédient qu'elle contient
    if(sortedCategories.length !== this.state.categories.length) {
      this.setState({categories: sortedCategories});
    }
  }

  // Récupération des catégories de produits depuis la liste d'ingrédient, conservation d'une seule instance de chaque et tri alphabétique
  sortCategories = () => {
    return this.props.ingredients
      .map(ingredient => ingredient.department)
      .filter((category, index, array) => index === array.lastIndexOf(category))
      .sort();
  }

  render() {
    return (
      <div className="container">
        <div className="text-center">
          <h2>Your Shopping List</h2>
        </div>
        {this.state.categories.length > 0 ? (
          this.state.categories.map(category => (
            <DepartmentItem key={category} onIngredientRemove={this.props.onIngredientRemove} departmentName={category} ingredientList={this.props.ingredients} />
          ))
        ) : (
          <p>Your Shopping list is empty</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.shoppingList
  };
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

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);
