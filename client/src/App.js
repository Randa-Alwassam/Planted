import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import PlantsDesplay from "./components/plants/PlantsDisplay";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Tasks from "./components/plants/PlantTasks";
import Errors from "./components/Errors";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/users/plants/:id">
          <PlantsDesplay />
        </Route>
        <Route exact path="/plants/tasks/:id">
          <Tasks />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
