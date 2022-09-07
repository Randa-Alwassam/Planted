import React, { useState } from 'react'
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import DisplayPlants from './components/plants/DisplayPlants';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import PlantTasks from './components/plants/PlantTasks';
import Errors from './components/Errors';
import AppContext from './context'
import Chatroom from './components/chat/Chatroom'

function App() {
  const [user, setUser] = useState({})
  
  return (
    <BrowserRouter>
    <Navbar/>
      <Switch>
      <AppContext.Provider value={{user , setUser}}>
      <Route exact path="/"> 
          <Home/>  
        </Route>
        <Route exact path="/login"> 
          <Login/>  
        </Route>
        <Route exact path="/users/plants/:id"> 
          <DisplayPlants />  
        </Route>
        {/* -------------- */}
        <Route exact path="/chat/:id"> 
          <Chatroom/>  
        </Route>
        {/* -------------- */}
        <Route exact path="/plants/tasks/:id"> 
          <PlantTasks />  
        </Route>
      </AppContext.Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
