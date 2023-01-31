import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import MainHeader from "./components/MainHeader";
import Products from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <div>
      <header>
        <MainHeader />
      </header>
      <main>
        <Route path="/" exact>
          <Redirect to="/welcome"/>
        </Route>
        <Route path="/welcome">
          <Welcome />
        </Route>
        <Route path="/products" exact>
          <Products />
        </Route>
        <Route path="/product-detail/:productId">
          <ProductDetail />
        </Route>
      </main>
    </div>
  );
}

export default App;
