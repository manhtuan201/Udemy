import React, { useContext } from "react";

import Card from "../UI/Card";
import "./ProductItem.css";
import { ProductsContext } from "../context/products-context";

const ProductItem = (props) => {
  const productCtx = useContext(ProductsContext);
  const toggleFavHandler = (productId) => {
    productCtx.toggleFav(productId);
  };

  return (
    <Card style={{ marginBottom: "1rem" }}>
      <div className="product-item">
        <h2 className={props.isFav ? "is-fav" : ""}>{props.title}</h2>
        <p>{props.description}</p>
        <button
          className={!props.isFav ? "button-outline" : ""}
          onClick={() => toggleFavHandler(props.id)}
        >
          {props.isFav ? "Un-Favorite" : "Favorite"}
        </button>
      </div>
    </Card>
  );
};

export default ProductItem;
