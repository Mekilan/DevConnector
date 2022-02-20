import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Landing from "./components/layouts/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/dashboard";
import Alert from "./components/layouts/Alert";
import NotFound from "./components/layouts/NotFound";
import CreateProfile from "./components/layouts/profile-forms/CreateProfile";
import EditProfile from "./components/layouts/profile-forms/EditProfile";
import history from "./components/history";
//Redux
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router history={history}>
        <Fragment>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Landing />} />
          </Routes>
          <section className="container">
            <Alert />
            <Routes>
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/login" element={<Login />} />
              <Route
                exact
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/create-profile"
                element={
                  <PrivateRoute>
                    <CreateProfile />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/edit-profile"
                element={
                  <PrivateRoute>
                    <EditProfile />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
