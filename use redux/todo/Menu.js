import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import {
  handleAllAction,
  handleActiveAction,
  handleCompletedAction,
} from "../actions/filter";
import { onHandleClearCompletedAction } from "../actions/todo";
import { filterAction } from "../constants/action";
import MenuItem from "./MenuItem";
const Menu = ({ count, isClearCompleted }) => {
  const [filterActive, setFilterActive] = useState(0);
  const [username, setUsername] = useState("");
  const history = useHistory();
  const historyState = { username: username };
  const dispatch = useDispatch();
  const handleClearCompleted = () => {
    dispatch(onHandleClearCompletedAction());
  };
  useEffect(() => {
    setUsername(history.location.state.username);
    dispatch({ type: filterAction.ALL, payload: null });
  }, []);
  const handleAll = (event) => {
    event.preventDefault();
    setFilterActive(0);
    history.push({ pathname: "/todo", state: historyState });
    dispatch(handleAllAction());
  };
  const handleActive = (event) => {
    event.preventDefault();
    setFilterActive(1);
    history.push({ pathname: "/todo/active", state: historyState });
    dispatch(handleActiveAction());
  };
  const handleCompleted = (event) => {
    event.preventDefault();
    setFilterActive(2);
    history.push({
      pathname: "/todo/completed",
      state: historyState,
    });
    dispatch(handleCompletedAction());
  };
  const toFirstCapitalCase = (action) => {
    const lower = action.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  const listHandleClick = [handleAll, handleActive, handleCompleted];
  const listActionTitle = [
    toFirstCapitalCase(filterAction.ALL),
    toFirstCapitalCase(filterAction.ACTIVE),
    toFirstCapitalCase(filterAction.COMPLETED),
  ];
  const listPath = ["/todo", "/todo/active", "/todo/completed"];
  const list = listActionTitle.map((title, index) => (
    <li className="menu__item" key={title}>
      <MenuItem
        path={listPath[index]}
        handleClick={listHandleClick[index]}
        isUpdate={index === filterActive}
      >
        {title}
      </MenuItem>
    </li>
  ));
  return (
    <Router>
      <div className="menu">
        <span className="menu__count">
          {count} {count > 1 ? "items left" : "item left"}
        </span>
        <ul className="menu__items">{list}</ul>
        <button
          className="menu__clear"
          onClick={handleClearCompleted}
          style={isClearCompleted ? { opacity: "1" } : {opacity: "0"}}
        >
          Clear completed
        </button>
      </div>
    </Router>
  );
};

export default Menu;
