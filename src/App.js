import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Activation from "./components/Auth/Activation";
import { useSelector } from "react-redux";
import Dashboard from "./containers/Dashboard/Dashboard";

export default function App() {
  const userState = useSelector((state) => state.user);

  function AuthRouter() {
    if (!userState.temp_id) {
      return (
        <>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </>
      );
    } else {
      return <Route exact path="/activate" component={Activation} />;
    }
  }

  function DashboardRouter() {
    return <Route exact path="/dashboard" component={Dashboard} />;
  }

  console.log(userState);
  return (
    <Router>
      <Switch>
        {userState.activated ? <DashboardRouter /> : <AuthRouter />}
      </Switch>
    </Router>
  );
}
