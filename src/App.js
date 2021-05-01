import "./App.css";
import PrivateRoute from "./PrivateRoute";
import Login from './login/Login';
import Todo from "./todo/Todo";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {

  return (

    <Router>
      <Switch>
        <Route exact path="/">
          <Login/>
        </Route>
        <PrivateRoute path="/todo" component={Todo} />
        <PrivateRoute path="/todo/active" component={Todo} />
        <PrivateRoute path="/todo/completed" component={Todo} />

      </Switch>
    </Router>
  );
}

export default App;
