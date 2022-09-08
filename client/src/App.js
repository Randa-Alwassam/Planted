import React, { useState } from 'react'
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import DisplayPlants from './plants/DisplayPlants';
import CreatePlant from './plants/CreatePlant';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import PlantTasks from './plants/PlantTasks';
import TaskCreate from './plants/TaskCreate';
import AppContext from './context'
import Chatroom from './chat/Chatroom'
import cute from "./components/img/cut.png"
import Errors from './components/Errors'
import WebIntro from './components/WebIntro'


function App() {
  const [user, setUser] = useState({ username:"", _id:''})
  const [signed,setSigned] = useState(false);

  return (
    <BrowserRouter>
      <Navbar />
      {/* --- to display the user plants --- */}
      {user._id != ''? <Link to={"/users/plants/"}><img src={cute} alt="loged in" className='cut'/></Link>: null }
      <Switch>
      <AppContext.Provider value={{user , setUser , signed , setSigned}}>
      <Route exact path="/"> 
          <Home/>  
        </Route>
        <Route exact path="/login"> 
          <Login/>  
        </Route>
        <Route exact path="/users/plants/new/"> 
          <CreatePlant/>  
        </Route>
        <Route exact path="/plants/tasks/new/:plantId"> 
          <TaskCreate/>  
        </Route>
        <Route exact path="/users/plants/"> 
          <DisplayPlants />  
        </Route>
        {/* -------------- */}
        <Route exact path="/chat"> 
          <Chatroom/>  
        </Route>
        {/* -------------- */}
        <Route exact path="/plants/tasks/:plantId"> 
          <PlantTasks />  
        </Route>
        <Route exact path="/error"> 
          <Errors />  
        </Route>
        <Route exact path="/info"> 
          <WebIntro />  
        </Route>
      </AppContext.Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
