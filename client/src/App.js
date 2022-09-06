import './App.css';
import Home from './components/Home';
import Details from './components/Details';
import Update from './components/Update';
import Create from './components/Create';
import Status from './components/Status';
import Navbar from './components/Navbar';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Errors from './components/Errors';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Switch>
        <Route exact path="/"> 
          <Home /> {/* --- the home page to display all the players --- */}
        </Route>
        <Route exact path="/new"> 
          <Create /> {/* --- the form page (for creatind new player) so the users can submit their favorite players --- */}
        </Route>
        <Route exact path="/status/game/"> 
          <Status />  {/* --- the see the status of the players --- */}
        </Route>
        <Route exact path="/status/game/:number"> 
          <Status />  {/* --- the see the status of the players --- */}
        </Route>
        <Route exact path="/edit/:id"> 
          <Update /> {/* --- the form page (for updateing the player) so the users can submit their favorite players --- */}
        </Route>
        <Route exact path="/error"> 
          <Errors /> {/* --- the error page --- */}
        </Route>
        <Route exact path="/:id"> 
          <Details />  {/* --- the details of one player --- */}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
