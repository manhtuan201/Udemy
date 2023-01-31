import { useDispatch, useSelector } from "react-redux";
import { addCartActions, cartActions } from "../store/cart-slice";
import Card from "../UI/Card";
import classes from "./ProductItem.module.css";

const ProductItem = (props) => {
  const { id, quantity, title, price, description } = props;
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const addCarthandHandler = () => {
    // const newTotalQuantity = cart.totalQuantity + 1;
    // const updatedItems = cart.items.slice();
    // const existingItem = updatedItems.find((item) => item.id === id);
    // if (existingItem) {
    //   const updatedItem = { ...existingItem };
    //   updatedItem.quantity++;
    //   updatedItem.price = updatedItem.price + price;
    //   const existingItemIndex = updatedItems.findIndex(
    //     (item) => item.id === id
    //   );
    //   updatedItems[existingItemIndex] = updatedItem;
    // } else {
    //   updatedItems.push({
    //     id: id,
    //     price: price,
    //     quantity: 1,
    //     totalPrice: price,
    //     name: title,
    //   });
    // }
    // const newCart = {
    //   totalQuantity : newTotalQuantity,
    //   items: updatedItems,
    // }
    // dispatch(cartActions.replaceCart(newCart));
    dispatch(
      cartActions.addItemHandler({
        id,
        title,
        price,
      })
    );
  };
  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>{price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addCarthandHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
