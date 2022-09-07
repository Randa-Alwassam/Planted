import React, { Component, useState , useEffect} from "react";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import css from '../Styles.module.css';
import axios from 'axios';
import back from './back.svg';
import { Link, useParams, useHistory } from "react-router-dom";

function Tasks(props) {
  const { id } = useParams();
  // const history = useHistory();
  const [plant, setPlant] = useState("");
  const [tasks, setTasks] = useState([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/plants/" + id)
      .then((res) => setPlant(res.data.plant))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/plants/tasks/" + id)
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
    return `${y}years and ${m} months`;
  }

  const plantAge = getAge("2022-09-01");
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
      <Link to="/">
        <img src={back}></img>
      </Link>
      <div className={css.box}>
        <div>
          {plant.plantName}
          {plantAge}
        </div>
        <div className={css.divCenter}>
          {tasks.map((task) => (
            <div className={css.box}>
              {task.taskName}
              {task.data}
              <input
                type="checkbox"
                value={task.isDone}
                checked={task.isDone}
                onClick={(e) => changehandle(task._id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tasks;
