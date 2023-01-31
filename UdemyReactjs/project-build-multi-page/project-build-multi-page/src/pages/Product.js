import { Link } from "react-router-dom";

const Products = () => {
  return (
    <>
      <h1>The Product Page</h1>
      <ul>
        <li>
          <Link to="/product-detail/p1">A Cake</Link>
        </li>
        <li>
          <Link to="/product-detail/p2">A Car</Link>
        </li>
        <li>
          <Link to="/product-detail/p3">A online course</Link>
        </li>
      </ul>
    </>
  );
};
export default Products;
