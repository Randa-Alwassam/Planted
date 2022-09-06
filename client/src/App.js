import logo from './logo.svg';
import './App.css';
import DisplayPlants from './components/DisplayPlants';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Errors from './components/Errors';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/users/plants/:id"> 
          <DisplayPlants />  
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
