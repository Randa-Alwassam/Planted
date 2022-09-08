import React, { Component, useState, useEffect, useContext } from "react";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import css2 from '../components/css/DisplayPlants.module.css';
import css from "../components/css/Styles.module.css"
import axios from 'axios';
import back from './back.svg';
import add from './add.svg';
import pic from "../components/img/plant_profile.png"
import { Link, useParams, useHistory } from "react-router-dom";
import AppContext from "../context"
import "./Plant.css"
// MUI Components
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const fabStyle = {
  position: "absolute",
  top: 5,
  right: 10,
  backgroundColor: "#81b8a8",
};

function Tasks(props) {
  const { user, setUser, signed, setSigned } = useContext(AppContext);
  const { plantId } = useParams();
  const history = useHistory();
  //const { user } = props;
  // const history = useHistory();
  const [plant, setPlant] = useState("");
  const [tasks, setTasks] = useState([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!signed) {
      history.push('/error')
      return;
  }
    console.log(user);
    axios
      .get("http://localhost:8000/api/plants/" + plantId)
      .then((res) => setPlant(res.data.plant))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/plants/tasks/" + plantId)
      .then((res) => {
        console.log(res.data);
        setTasks(res.data);
      })
      .catch((error) => console.log("error: " + error));
  }, [checked]);

  function getAge(plantAgeString) {
    let today = new Date();
    let birthDate = new Date(plantAgeString);

    let y = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      y--;
    }
    if (m === 0 && y === 0) {
      return "Couple Days";
    }
    if (y === 0) {
      return `${m} months`;
    }
    return `${y} years and ${m} months`;
  }

  const plantAge = getAge(plant.plantAge);
  console.log(plant.plantAge);

  const changehandle = (taskId) => {
    let currntTask = {};

    axios
      .get("http://localhost:8000/api/tasks/" + taskId)
      .then((res) => {
        currntTask = res.data.task;
        currntTask = { ...currntTask, isDone: !currntTask.isDone };

        axios
          .put("http://localhost:8000/api/tasks/update/" + taskId, currntTask)
          .then((res) => {
            console.log(res);
            if (res.data.task.isDone == true) {
              confirmAlert({
                message: "You did it Planter!",
                buttons: [
                  {
                    label: "X",
                    onClick: null,
                  },
                ],
              });
            }
            setChecked(!checked);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={css.App}>
      <div className={css2.box}>
        <Link to={"/users/plants/"} className="back">
          <Fab color="primary" aria-label="add" style={fabStyle}>
            <ArrowForwardIosIcon />
          </Fab>
        </Link>
        {typeof plant.image == "undefined" || plant.image == "" ?
          (<img src={pic} className={css2.pic} />)
          : (<img src={plant.image} className="plantTask me-2" />)}
        {/* <img src={pic} className={css2.pic} /> */}

        <p>{plant.plantName} {plantAge}</p>
        <div className={css.divCenter}>
          {tasks.map((task) => (
            <div className={css2.task}>
              {task.taskName}
              {task.data}
              <input type="checkbox" value={task.isDone} checked={task.isDone} onClick={(e) => changehandle(task._id)} className={css2.check} />
            </div>
          ))}
        </div>
      </div>
      <Link to={"new/" + plantId} className={css2.addbtn}><img src={add}></img></Link>
    </div>
  );
}

export default Tasks;
