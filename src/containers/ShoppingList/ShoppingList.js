import * as React from "react";
import { connect } from "react-redux";

import DepartmentItem from "../../components/DepartmentItem/DepartmentItem";

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
            <DepartmentItem key={category} departmentName={category} ingredientList={this.props.ingredients} />
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

export default connect(mapStateToProps)(ShoppingList);
