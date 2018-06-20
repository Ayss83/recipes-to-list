import * as React from "react";
import { connect } from "react-redux";

import DepartmentItem from "../../components/DepartmentItem/DepartmentItem";

class ShoppingList extends React.Component {
  state = {
    categories: []
  };

  componentWillMount() {
    const sortedCategories = this.props.ingredients
      .map(ingredient => ingredient.department)
      .filter((category, index, array) => index === array.lastIndexOf(category))
      .sort();
    this.setState({ categories: sortedCategories });
  }

  render() {
    return (
      <div className="container">
        <h2>Your Shopping list</h2>
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
