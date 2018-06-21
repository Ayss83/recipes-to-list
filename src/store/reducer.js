import actionTypes from "./actionTypes";

const initialState = {
  shoppingList: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      // Si la liste d'achats est vide, la liste d'ingrédients reçue devient la liste d'achats
      if (state.shoppingList.length === 0) {
        return {
          ...state,
          shoppingList: action.payload.ingredients
        };
      }

      //deep copy de la liste d'achats
      const newList = [...state.shoppingList].map(ingredient => {
        return { ...ingredient };
      });

      action.payload.ingredients.forEach(ingredient => {
        let inShoppingList = false;

        newList.forEach(presentIng => {
          if (
            presentIng.name === ingredient.name &&
            presentIng.unit === ingredient.unit
          ) {
            presentIng.quantity += ingredient.quantity;
            inShoppingList = true;
          }
          // conversion des grammes en kilos ou kilos en grammes
          else if (
            presentIng.name === ingredient.name &&
            (presentIng.unit === "g" || presentIng.unit === "kg") &&
            (ingredient.unit === "g" || ingredient.unit === "kg")
          ) {
            if (presentIng.unit === "g") {
              presentIng.quantity += ingredient.quantity * 1000;
              inShoppingList = true;
            } else {
              presentIng.quantity += ingredient.quantity / 1000;
              inShoppingList = true;
            }
          }
        });
        if (!inShoppingList) {
          newList.push(ingredient);
        }
      });

      return {
        ...state,
        shoppingList: newList
      };

    case actionTypes.REMOVE_INGREDIENT:
      //deep copy de la liste d'achats puis filtre pour retirer l'ingrédient voulu
      const listIngRemoved = [...state.shoppingList]
        .map(ingredient => {
          return { ...ingredient };
        })
        .filter(
          ingredient => ingredient.name !== action.payload.ingredientToRemove
        );

      return {
        ...state,
        shoppingList: listIngRemoved
      };

    default:
      return state;
  }
};

export default reducer;
