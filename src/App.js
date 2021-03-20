import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Form from "./components/Form/Form";
import { createContext, useState } from "react";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Destination from "./components/Destination/Destination";
export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [ticket, setTicket] = useState(0);

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <div className="home" style={{ backgroundColor: "#282a36" }}>
        <Router>
          <Header></Header>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/form" component={Form} />
            <PrivateRoute path="/destination">
              <Destination></Destination>
            </PrivateRoute>
            <PrivateRoute path="/destination/:key">
              <Destination></Destination>
            </PrivateRoute>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/">
              <Home></Home>
            </Route>
          </Switch>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
