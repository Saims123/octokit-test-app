import React, { createContext, useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import { initialState, reducer } from "./store/github/reducer";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CSV from "./components/CSV/CSV";
export const AuthContext = createContext({
  state: Object(),
  dispatch: Object(),
});
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} />
          <Route path="/csv" component={CSV} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
