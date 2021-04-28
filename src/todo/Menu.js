import React from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { onHandleClearCompletedAction } from "../actions/todo";
const Menu = ({
  count
}) => {
  const dispatch = useDispatch();
  const handleClearCompleted = () => {
    dispatch(onHandleClearCompletedAction());
  };
  return (
    <Router>
      <div className="menu">
        <span className="menu__count">
          {count} {count > 1 ? "items left" : "item left"}
        </span>
        <ul className="menu__items">
          <li className="menu__item">
            <Link to="/todo" >
              All
            </Link>
          </li>
          <li className="menu__item">
            <Link to="/todo/active" >
              Active
            </Link>
          </li>
          <li className="menu__item">
            <Link to="/todo/completed" >
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
