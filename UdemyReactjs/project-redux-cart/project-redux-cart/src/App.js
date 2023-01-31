import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Notification from "./components/Cart/Notification";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { sendCartData } from "./components/store/cart-slice";
import { uiActions } from "./components/store/ui-slice";
let isInitial = true;
function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.show.showCart);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.show.notification);

    useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    dispatch(sendCartData(cart));
    
  }, [cart, dispatch]);
  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
