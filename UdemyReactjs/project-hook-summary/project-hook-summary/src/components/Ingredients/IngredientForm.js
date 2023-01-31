import React, { useState } from "react";

import Card from "../UI/Card";
import LoadingIndicator from "../UI/LoadingIndicator";
import "./IngredientForm.css";

const IngredientForm = React.memo((props) => {
  const [inputState, setInputState] = useState({ name: "", amount: "" });

  const submitHandler = (event) => {
    event.preventDefault();

    props.onAddIngredient({
      name: inputState.name,
      amount: inputState.amount,
    });
    // ...
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              value={inputState.name}
              onChange={(event) => {
                const newName = event.target.value;
                setInputState((prev) => ({
                  name: newName,
                  amount: prev.amount,
                }));
              }}
              name="name"
              id="title"
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              value={inputState.amount}
              name="amount"
              id="amount"
              onChange={(event) => {
                const newAmount = event.target.value;
                setInputState((prev) => ({
                  name: prev.name,
                  amount: newAmount,
                }));
              }}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
              {props.loading && <LoadingIndicator/>}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
