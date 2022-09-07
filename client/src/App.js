import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import DisplayPlants from './components/plants/DisplayPlants';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import PlantTasks from './components/plants/PlantTasks';
import Errors from './components/Errors';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Switch>
      <Route exact path="/"> 
          <Home/>  
        </Route>
        <Route exact path="/users/plants/:id"> 
          <DisplayPlants />  
        </Route>
        <Route exact path="/plants/tasks/:id"> 
          <PlantTasks />  
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
