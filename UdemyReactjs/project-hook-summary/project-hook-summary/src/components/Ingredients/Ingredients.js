import { CheckOutlined } from "@ant-design/icons";
import { WarningOutlined } from "@ant-design/icons/lib/icons";
import { notification } from "antd";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import ErrorModal from "../UI/ErrorModal";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";
const ingredientReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [action.ingredient, ...state];

    case "SET":
      return action.ingredients;
    case "DELETE":
      return state.filter((item) => item.id !== action.id);
    default: {
      throw new Error("Something errors !");
    }
  }
};
const initialHttpState = { loading: false, err: null };
const httpReducer = (curHttpState, action) => {
  switch (action.type) {
    case "SEND":
      return { loading: true, err: null };
    case "RESPONSE":
      return { ...curHttpState, loading: false };
    case "ERROR":
      return { loading: false, err: action.errData };
    default:
      throw new Error("Something errors !");
  }
};
function Ingredients() {
  const [ingredientList, dispatch] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttpState] = useReducer(
    httpReducer,
    initialHttpState
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [api, contextHolder] = notification.useNotification();

  const successNotification = () => {
    api.open({
      message: "Success",
      description: "You added ingredient succesfully .",
      icon: <CheckOutlined style={{ color: "#11d66a" }} />,
    });
  };
  const errNotification = () => {
    api.open({
      message: "Error",
      description: `You dont't added ingredient`,
      icon: <WarningOutlined style={{ color: "red" }} />,
    });
  };
  const handleSearch = useCallback((e) => {}, []);
  useEffect(() => {
    fetch(
      `https://react-hook-summary-93283-default-rtdb.firebaseio.com/ingredients.json`
    )
      .then((response) => response.json())
      .then((responseData) => {
        const loadedIngrdients = [];
        for (const key in responseData) {
          loadedIngrdients.push({
            id: key,
            name: responseData[key].name,
            amount: responseData[key].amount,
          });
        }
        dispatch({ type: "SET", ingredients: loadedIngrdients });
      });
  }, []);
  const handlerAddIngredient = async (ingredient) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://react-hook-summary-93283-default-rtdb.firebaseio.com/ingredients.json`,
        {
          method: "POST",
          body: JSON.stringify(ingredient),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = response.json();
      data.then((responseData) => {
        dispatch({
          type: "ADD",
          ingredient: { id: responseData.name, ...ingredient },
        });
        setIsLoading(false);
        successNotification();
      });
    } catch (err) {
      errNotification();
      setIsLoading(false);
    }
  };
  const removeIngredient = (ingredientId) => {
    setIsLoading(true);
    try {
      fetch(
        `https://react-hook-summary-93283-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
        {
          method: "DELETE",
        }
      ).then((response) => {
        dispatch({ type: "DELETE", id: ingredientId });
        setIsLoading(false);
      });
    } catch (err) {
      setError("Something went wrong");
      setIsLoading(false);
    }
  };
  const clearError = () => {
    setError(null);
  };
  return (
    <>
      {contextHolder}
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <div className="App">
        <IngredientForm
          loading={isLoading}
          onAddIngredient={handlerAddIngredient}
        />

        <section>
          <Search onSearchName={handleSearch} />
          <IngredientList
            loading={isLoading}
            ingredients={ingredientList}
            onRemoveItem={removeIngredient}
          />
          {/* Need to add list here! */}
        </section>
      </div>
    </>
  );
}

export default Ingredients;
