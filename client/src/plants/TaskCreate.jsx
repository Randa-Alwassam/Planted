import React, { useEffect,useState,useContext } from "react";
import axios from "axios";
import { useHistory, Link, useParams } from "react-router-dom";
import "./Plant.css"
import AppContext from "../context"

// MUI Components
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// IMG
import ment from "../components/img/mint.png";
import { height } from "@mui/system";
import taskImage from "./planning.png"

// CSS لو يضاف لملف
const fabStyle = {
    position: "absolute",
    top: 36,
    right: 36,
    backgroundColor: "#81b8a8",
};
const pinkBox = {
    backgroundColor:" #ffffffc2",
    width: "100%",
    height: "300px",
    boxShadow: "5px 5px 5px gainsboro"
};
function CreateTask(props) {
    const { user, setUser, signed, setSigned } = useContext(AppContext);
    const { plantId } = useParams();
    const history = useHistory();
    // const [plant, setPlant] = useState({
    //     plantName: "",
    //     type: "",
    //     plantAge: "",
    //     tasks: [],
    // });
    const [task, setTask] = useState({
        taskName: "",
        date: "",
        isDone: false,
    });

    useEffect(() => {
        if (!signed) {
            history.push('/error')
            return;
        }},[]);

    // Crreate Task API
    const addTask = (e) => {
        e.preventDefault();
        console.log(task);
        axios
            .post("http://localhost:8000/api/tasks/new", task)
            .then((res) => {
                console.log(res.data);
                const task = res.data.task
                if ("error" in res.data) {
                    console.log("errors");
                } else {
                    axios.get("http://localhost:8000/api/plants/" + plantId)
                        .then(res => {
                            const plant = res.data.plant
                            plant.tasks.push(task._id)
                            axios.put("http://localhost:8000/api/plants/update/" + plantId, plant)
                                .then((res) => {
                                    console.log(res);
                                    history.push('/plants/tasks/' + plantId)
                                })
                                .catch((err) => console.log(err))
                        })
                        .catch((err) => console.log(err))
                }
                //   Route to desplay one plant
                history.push("#");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <div style={{  marginRight : 50}}>
                {/* route to desplay one plant */}
                {/* Header */}
                <div className="card border-0 d-flex justify-content-center align-items-center mb-5" style={pinkBox}>
                    <Link to={"/plants/tasks/"+plantId}>
                        <Fab color="primary" aria-label="add" style={fabStyle}>
                            <ArrowForwardIosIcon />
                        </Fab>
                    </Link>
                    {/* IMAGE BG */}
                    {/* <div className="card border-0 d-flex justify-content-center align-items-center " style={{ width: "200px", height: "200px" }}> */}
                        {/* IMAGE */}
                        <img src={taskImage} alt="plant" style={{ height: "200px" }} />
                    {/* </div> */}
                    {/* <p>{plant.plantName}</p> */}
                </div>

                {/* Form */}
                <div className="mt-5">
                    <form onSubmit={addTask} className="d-flex flex-column align-items-center" >
                        <p>set your plant's task</p>
                        <div className="col-12 mb-5">
                            <hr className="mb-5" />
                            <div className="row text-start mb-4">
                                <label className="form-label">Task title</label>
                                <input type="text" className="form-control" style={{ borderColor: "#326E62" }} value={task.taskName} onChange={(e) => setTask({ ...task, taskName: e.target.value })} />
                            </div>
                            <div className="row text-start mb-3">
                                <label className="form-label">Task End Date</label>
                                <input value={task.date} onChange={(e) => setTask({ ...task, date: e.target.value })} type="date" className="form-control" style={{ borderColor: "#326E62" }} />
                            </div>
                        </div>
                        <Button type="submit" variant="contained" className="mb-3" style={{ backgroundColor: "#326E62", width: 200 ,fontFamily: "cursive"}}>New Task ✔</Button>
                        {/* Route to desplay one plant */}
                        <Link to="#" style={{ textDecoration: "none" }}>
                            <Button variant="text" style={{ borderColor: "#326E62", color: "#326E62", width: 200 }}>Cancel</Button>
                        </Link>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateTask;