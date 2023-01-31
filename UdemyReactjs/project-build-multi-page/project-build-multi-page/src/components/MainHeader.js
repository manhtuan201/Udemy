import {  NavLink } from "react-router-dom";
import classes from "./MainHeader.module.css"
const MainHeader = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <NavLink to="/welcome">welcome</NavLink>
          </li>
          <li>
            <NavLink to="/products">products</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default MainHeader;
