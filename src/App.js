// @flow

import * as React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import RecipesList from "./containers/RecipesList/RecipesList";
import RecipeDetails from "./containers/RecipeDetails/RecipeDetails";
import ShoppingList from "./containers/ShoppingList/ShoppingList";

type state = {};

class App extends React.Component<state> {
  render() {
    return (
      <BrowserRouter>
        <div className="container-fluid">
          <Navbar />
          <Switch>
            <Route path="/" exact render={() => (<Redirect to="/recipes" />)} />
            <Route path="/recipes/:recipe_id" component={RecipeDetails} />
            <Route path="/recipes" exact component={RecipesList} />
            <Route path="/shopping-list" exact component={ShoppingList} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
