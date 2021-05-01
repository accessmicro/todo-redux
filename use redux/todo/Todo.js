import Add from "./Add";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import List from "./List";
import "./css/style.css";
import Menu from "./Menu";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getFilter, getSearch } from "../reducers/selector/selectorFilter";
import { callAPI, onHandleChooseAllAction } from "./../actions/todo";
import { onHandleSearchAction } from "./../actions/search";
const Todo = () => {
  const [isLoading, setiIsLoading] = useState(false);
  const TITLE = "todos";
  const history = useHistory();
  const [count, setCount] = useState(0);
  const [isSearch, setIsSearch] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const todos = useSelector((state) => state.todo, shallowEqual);
  const filterItems = useSelector(getFilter, shallowEqual);
  const searchItems = useSelector(getSearch, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(callAPI());
  }, []);
  useEffect(() => {
    if (valueSearch !== "") {
      dispatch(onHandleSearchAction(valueSearch));
    }
  }, [valueSearch]);

  useEffect(() => {
    let getCount = () => {
      todos.forEach((element) => {
        if (element.completed === false) {
          setCount((pre) => pre + 1);
        }
      });
    };
    setCount(0);
    getCount();
  }, [todos]);

  const onHandleChooseAll = () => {
    dispatch(onHandleChooseAllAction(count));
  };

  const onHandleChangeInputSearch = (event) => {
    setValueSearch(event.target.value);
  };
  const onHandleDeleteSearch = () => {
    setValueSearch("");
    setIsSearch(false);
  };
  const onHandleSearch = () => {
    setIsSearch((pre) => !pre);
  };



  return (
    <section className="todo__screen">
      <div className="todo__info">
        <div className="todo__username">
          <i className="far fa-user"></i>{" "}
          <span>{history.location.state.username}</span>
        </div>
        <button
          className="todo__logout"
          onClick={() => {
            localStorage.removeItem("token");
            history.push({ pathname: "/" });
          }}
        >
          Log out
        </button>
      </div>
      <h1 className="todo__title">{TITLE}</h1>
      <div className="todo">
        <Add
          handleChooseAll={onHandleChooseAll}
          isSearch={isSearch}
          handleSearch={onHandleSearch}
          handleDeleteSearch={onHandleDeleteSearch}
          handleChangeInputSearch={onHandleChangeInputSearch}
          valueSearch={valueSearch}
        />
        <List list={valueSearch !== "" ? searchItems : filterItems} />
        {todos.length > 0 && (
          <Menu count={count} isClearCompleted={todos.length > count} />
        )}
      </div>
     { (!isLoading) ? (<div className="todo__loading">
        <div class="circle-loading"></div>
      </div>):<></> }
    </section>
  );
};

export default Todo;
