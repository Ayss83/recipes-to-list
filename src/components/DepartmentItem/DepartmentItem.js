import * as React from "react";

const DepartmentItem = props => (
  <div>
    <h4>{props.departmentName}</h4>
    <ul className="list-group d-flex">
      {props.ingredientList.map(
        ingredient =>
          ingredient.department === props.departmentName ? (
            <li
              key={ingredient.name}
              className="list-group-item"
            >
              {ingredient.name} {Math.round(ingredient.quantity * 100) / 100}{" "}
              {ingredient.unit
                ? ingredient.unit
                : ingredient.quantity > 1
                  ? "pcs"
                  : "pc"}
            </li>
          ) : null
      )}
    </ul>
  </div>
);

export default DepartmentItem;
