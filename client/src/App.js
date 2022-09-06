import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import DisplayPlants from './components/DisplayPlants';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
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
      </Switch>
    </BrowserRouter>
  );
}

export default App;
