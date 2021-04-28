import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
const Menu = ({
  count,
  handleAll,
  handleActive,
  handleCompleted,
  handleClearCompleted,
}) => {
  return (
    <Router>
      <div className="menu">
        <span className="menu__count">
          {count} {count > 1 ? "items left" : "item left"}
        </span>
        <ul className="menu__items">
          <li className="menu__item">
            <Link to="/todo" onClick={handleAll}>
              All
            </Link>
          </li>
          <li className="menu__item">
            <Link to="/todo/active" onClick={handleActive}>
              Active
            </Link>
          </li>
          <li className="menu__item">
            <Link to="/todo/completed" onClick={handleCompleted}>
              Completed
            </Link>
          </li>
        </ul>
        <button className="menu__clear" onClick={handleClearCompleted}>
          Clear completed
        </button>
      </div>
    </Router>
  );
};

export default Menu;
