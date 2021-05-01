import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";
function PrivateRoute ({component: Component, ...rest}) {
  const token = localStorage.getItem('token')
    return (
      <Route
        {...rest}
        render={(props) => token
          ? <Component {...props}/>
          : <Redirect to={{pathname: '/'}} />}
      />
    )
  }
  export default PrivateRoute