import Add from "./Add";
import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import List from "./List";
import "./css/style.css";
import api from "./callAPI";
import Menu from "./Menu";
const Todo = () => {
  const TITLE = 'todos'
  const history = useHistory();
  const [todoListSearch, setTodoListSearch] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState("");
  const addTask = useRef(null);
  const [item, setItem] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    addTask.current.focus();
    let getData = () => {
      api
        .get("/")
        .then((res) => {
          setTodoList(res.data);
          return todoList;
        })
        .catch((err) => {
          console.log(`err`, err);
        });
    };
    getData();
  }, []);
  useEffect(() => {
    let getCount = () => {
      todoList.forEach((element) => {
        if (element.completed === false) {
          setCount((pre) => pre + 1);
        }
      });
    };
    setCount(0);
    getCount();
    return () => {};
  }, [todoList]);
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
    if (count === 0) {
      todoList.forEach((element) => {
        api
          .put(`${element.id}`, { ...element, completed: false })
          .then((res) => {
            setTodoList((pre) =>
              pre.map((element) => {
                element.completed = res.data.completed;
                return element;
              })
            );
          })
          .catch((err) => console.log(`onChooseAll err`, err));
      });
    } else {
      todoList.forEach((element) => {
        api
          .put(`${element.id}`, { ...element, completed: true })
          .then((res) => {
            setTodoList((pre) =>
              pre.map((element) => {
                element.completed = res.data.completed;
                return element;
              })
            );
          })
          .catch((err) => console.log(`onChooseAll err`, err));
      });
    }
  };
  const handleChange = (data) => {
    setItem(data);
  };
  const onHandleDelete = (event) => {
    let idItem = event.target.id;

    api.delete(`/${idItem}`).then((res) => {
      setTodoList((pre) =>
        pre.filter((todoItem) => todoItem.id !== res.data.id)
      );
    });
  };
  const handleEnter = (event) => {
    if (event.charCode === 13 && item !== "") {
      api
        .post(`/`, { title: item, completed: false, isUpdate: false })
        .then((res) => {
          setTodoList((pre) => [...pre, res.data]);
          event.target.value = "";
          setItem("");
        });
    } else if (event.charCode === 13 && item === "") {
      alert("Mời bạn nhập thông tin!");
    }
  };
  const onChangeChecked = (event) => {
    let index = todoList.findIndex((todo) => todo.id === event.target.id);
    api
      .put(`/${event.target.id}`, { completed: !todoList[index].completed })
      .then((res) => {
        setTodoList((pre) =>
          pre.map((todo, indexTodo) =>
            index === indexTodo ? { ...res.data } : { ...todo }
          )
        );
      });
  };
  const onHandleDbl = (event) => {
    event.preventDefault();
    setTarget(event.target.textContent);
    const index = todoList.findIndex((todo) => todo.id === event.target.id);
    setTodoList((pre) =>
      pre.map((todo, indexTodo) =>
        index === indexTodo
          ? { ...pre[index], isUpdate: !pre[index].isUpdate }
          : { ...todo }
      )
    );
  };
  const onHandleUpdate = (event) => {
    setTarget(event);
  };
  const onHandleEnterInput = (event) => {
    const eventId = event.target.id;
    const eventValue = event.target.value;
    if (event.charCode === 13 && eventValue !== "") {
      const index = todoList.findIndex((todo) => todo.id === eventId);
      api
        .put(`/${eventId}`, { title: eventValue, isUpdate: false })
        .then((res) => {
          setTodoList((pre) =>
            pre.map((todo, indexTodo) =>
              index === indexTodo ? { ...res.data } : todo
            )
          );
        });
    } else if (event.charCode === 13 && eventValue === "") {
      onHandleDelete(event);
    }
  };
  const onHandleBlur = (event) => {
    const eventId = event.target.id;
    const eventValue = event.target.value;
    if (eventValue === "") {
      onHandleDelete(event);
    } else {
      const index = todoList.findIndex((todo) => todo.id === eventId);
      api
        .put(`/${eventId}`, { isUpdate: false, title: eventValue })
        .then((res) => {
          setTodoList((pre) =>
            pre.map((todoItem, indexItem) =>
              indexItem === index ? { ...res.data } : todoItem
            )
          );
        });
    }
  };
  const onHandleClearCompleted = () => {
    let arrId = todoList.map((id) => id);
    arrId.forEach((element) => {
      if (element.completed === true) {
        api.delete(`/${element.id}`).then((res) => {
          setTodoList((pre) =>
            pre.filter((todoItem) => todoItem.id !== res.data.id)
          );
        });
      }
    });
  };
  const onHandleAll = () => {
    history.push("/");
  };
  const onHandleActive = () => {
    history.push({ pathname: "/active" });
  };
  const onHandleCompleted = () => {
    history.push({ pathname: "/completed" });
  };
  const onSearch = () => {
    setIsSearch((pre) => !pre);
  };
  const onHandleChangeSearch = (event) => {
    setValueSearch((pre) => event);
  };
  const onHandleDeleteSearch = () => {
    setValueSearch("");
    setIsSearch(false);
  };
  const onHandleBlurSearch = () => {
    addTask.current.focus();
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
          value={item}
          onHandleChange={handleChange}
          onHandleEnter={handleEnter}
          onChooseAll={onChooseAll}
          ref={addTask}
          onSearch={onSearch}
          isSearch={isSearch}
          valueSearch={valueSearch}
          onHandleChangeSearch={onHandleChangeSearch}
          onHandleBlurSearch={onHandleBlurSearch}
          onHandleDeleteSearch={onHandleDeleteSearch}
        />
        <List
          list={valueSearch === "" ? todoList : todoListSearch}
          handleDelete={onHandleDelete}
          onChangeChecked={onChangeChecked}
          onHandleUpdate={onHandleUpdate}
          onHandleEnterInput={onHandleEnterInput}
          target={target}
          onHandleDbl={onHandleDbl}
          onHandleBlur={onHandleBlur}
        />
        {todoList.length > 0 && (
          <Menu
            count={count}
            handleAll={onHandleAll}
            handleActive={onHandleActive}
            handleCompleted={onHandleCompleted}
            handleClearCompleted={onHandleClearCompleted}
          />
        )}
      </div>
    </section>
  );
};

export default Todo;
