import "./App.css";
import api from "./todo/callAPI";
import React, { useEffect, useState } from "react";
import PrivateRoute from "./PrivateRoute";
import Login from './login/Login';
import Todo from "./todo/Todo";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  const [todoList, setTodoList] = useState([]);
  useEffect(() => {
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
    return () => {};
  }, []);

  return (

    <Router>
      <Switch>
        <Route exact path="/">
          <Login/>
        </Route>
        <PrivateRoute path="/todo" component={Todo} />
      </Switch>
    </Router>
  );
}

export default App;
