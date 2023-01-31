import React, { useContext } from "react";
import { ProductsContext } from "../components/context/products-context";

import FavoriteItem from "../components/Favorites/FavoriteItem";
import "./Products.css";

const Favorites = (props) => {
  const productCtx = useContext(ProductsContext);
  const product = productCtx.products.filter((prod) => {
    return prod.isFavorite === true;
  });
  let content;
  if (product.length > 0) {
    content = product.map((item) => (
      <ul className="products-list">
        <FavoriteItem
          id={item.id}
          key={item.key}
          title={item.title}
          description={item.description}
          isFav={item.isFavorite}
        />
      </ul>
    ));
  } else {
    content = <ul className="products-list"></ul>;
  }
  return content;
};

export default Favorites;
