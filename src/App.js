import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Activation from "./components/Auth/Activation";
import { useSelector } from "react-redux";
import Dashboard from "./containers/Dashboard/Dashboard";
// import PageNotFound from "./containers/NotFound/PageNotFound";

export default function App() {
  const userState = useSelector((state) => state.user);

  console.log(userState);

  function AuthRouter() {
    if (!userState.temp_id && !userState.email && !userState.id) {
      return (
        <>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </>
      );
    }

    if (userState.temp_id && !userState.activated) {
      <Route exact path="/activate" component={Activation} />;
    }

    return <Route exact path="/dashboard" component={Dashboard} />;
  }
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {userState.activated ? (
            <Redirect to="/dashboard" />
          ) : (
            <Redirect to="/register" />
          )}
        </Route>

        {/* <Route component={PageNotFound} /> */}

        <AuthRouter />
      </Switch>
    </Router>
  );
}
