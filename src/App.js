import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Tickets from "./components/Tickets/Tickets";
function App() {
  return (
    <div className="home" style={{ backgroundColor: "#282a36" }}>
      <Header></Header>
      <Tickets></Tickets>
      <Router>
        <Switch>
          <Route path="/home" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
