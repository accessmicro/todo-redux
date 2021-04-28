import Add from "./Add";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import List from "./List";
import "./css/style.css";
import api from "./callAPI";
import Menu from "./Menu";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  callAPI,
  onChooseAllAction,
} from "./../actions/todo";
const Todo = () => {
  const TITLE = "todos";
  const history = useHistory();
  const [todoListSearch, setTodoListSearch] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const [count, setCount] = useState(0);
  const [todoList, setTodoList] = useState([]);
  const todos = useSelector((state) => state.todo, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(callAPI());
  }, []);

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
    return () => {};
  }, [todos]);
  useEffect(() => {
    if (valueSearch !== "") {
      const arrNew = todoList.filter(
        (element) => element.title.indexOf(valueSearch) !== -1
      );
      setTodoListSearch([...arrNew]);
    }
    return () => {};
  }, [valueSearch, todoList]);
  const onChooseAll = () => {
    dispatch(onChooseAllAction(count));
    // if (count === 0) {
    //   todoList.forEach((element) => {
    //     api
    //       .put(`${element.id}`, { ...element, completed: false })
    //       .then((res) => {
    //         setTodoList((pre) =>
    //           pre.map((element) => {
    //             element.completed = res.data.completed;
    //             return element;
    //           })
    //         );
    //       })
    //       .catch((err) => console.log(`onChooseAll err`, err));
    //   });
    // } else {
    //   todoList.forEach((element) => {
    //     api
    //       .put(`${element.id}`, { ...element, completed: true })
    //       .then((res) => {
    //         setTodoList((pre) =>
    //           pre.map((element) => {
    //             element.completed = res.data.completed;
    //             return element;
    //           })
    //         );
    //       })
    //       .catch((err) => console.log(`onChooseAll err`, err));
    //   });
    // }
  };
  // const onHandleClearCompleted = () => {
  //   let arrId = todoList.map((id) => id);
  //   arrId.forEach((element) => {
  //     if (element.completed === true) {
  //       api.delete(`/${element.id}`).then((res) => {
  //         setTodoList((pre) =>
  //           pre.filter((todoItem) => todoItem.id !== res.data.id)
  //         );
  //       });
  //     }
  //   });
  // };
  const onHandleAll = () => {
    history.push("/");
  };
  const onHandleActive = () => {
    history.push({ pathname: "/active" });
  };
  const onHandleCompleted = () => {
    history.push({ pathname: "/completed" });
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
          // value={item}
          // onHandleChange={onHandleChange}
          // onHandleEnter={onHandleEnter}
          onChooseAll={onChooseAll}
          // onSearch={onSearch}
          // isSearch={isSearch}
          // valueSearch={valueSearch}
          // onHandleChangeSearch={onHandleChangeSearch}
          // onHandleBlurSearch={onHandleBlurSearch}
          // onHandleDeleteSearch={onHandleDeleteSearch}
        />
        <List list={valueSearch === "" ? todos : todoListSearch} />
        {todos.length > 0 && (
          <Menu
            count={count}
            // handleAll={onHandleAll}
            // handleActive={onHandleActive}
            // handleCompleted={onHandleCompleted}
            // handleClearCompleted={onHandleClearCompleted}
          />
        )}
      </div>
    </section>
  );
};

export default Todo;
