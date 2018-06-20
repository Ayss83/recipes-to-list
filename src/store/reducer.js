const initialState = {
  shoppingList: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_INGREDIENTS":
      // Si la liste d'achats est vide, la liste d'ingrédients reçue devient la liste d'achats
      if (state.shoppingList.length === 0) {
        return {
          ...state,
          shoppingList: action.payload.ingredients
        };
      }

      //deep copy de la liste d'achats
      const newList = [...state.shoppingList].map(ingredient => {
        return {...ingredient};
      });
      
      action.payload.ingredients.forEach(ingredient => {
        let inShoppingList = false;
        newList.forEach(presentIng => {
          if(presentIng.name === ingredient.name && presentIng.unit === ingredient.unit) {
            presentIng.quantity += ingredient.quantity;
            inShoppingList = true;
          }
        });
        if(!inShoppingList) {
          newList.push(ingredient);
        }
      })
      
      return {
        ...state,
        shoppingList: newList
      };
    default:
      return state;
  }
};

export default reducer;
