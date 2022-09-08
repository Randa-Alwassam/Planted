import React, { useEffect,useState, useContext } from "react";
import FileBase64 from 'react-file-base64';
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import "./Plant.css"
import p from "./Plant.css"


// MUI Components
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import AppContext from "../context";

function Create(props) {

    const history = useHistory();
    const { user, setUser, signed, setSigned } = useContext(AppContext);
    const plantsType = [
        "Herbs",
        "Shrubs",
        "Trees",
        "Creepers",
        "Climbers",
        "Indoor",
        "Fruits",
        "Veggies",
    ];
    const [value, setValue] = useState(plantsType[0]);
    const [inputValue, setInputValue] = useState("");
    const [plant, setPlant] = useState({
        plantName: "",
        type: "",
        plantAge: "",
        tasks: [],
        image:'',
    });
    const [errors, setErrors] = React.useState({
        plantNameValidation: "",
        typeValidation: "",
        plantAgeValidation: "",
    });

    useEffect(() => {
        if (!signed) {
            history.push('/error')
            return;
        }},[]);

    const handleImg = (base64) => {
        setPlant({ ...plant, image:base64})
    }

    const addPlant = (e) => {
        e.preventDefault();
        console.log(plant);
        axios.post("http://localhost:8000/api/plants/new", plant)
            .then((res) => {
                //   here it should return the newly created plant object
                console.log(res.data);
                if ('error' in res.data) {
                    console.log("error");
                    // setErrors({ nameError: res.data.error.errors.username.message })
                } else {
                    // setErrors({ 
                    // plantNameValidation: "",
                    // typeValidation: "",
                    // plantAgeValidation: "", })
                    user.plants.push(res.data.plant._id)
                    axios.put("http://localhost:8000/api/users/update/" + user._id, user)
                        .then((res) => {
                            console.log(res)
                            history.push("/users/plants/")
                        })
                        .catch((err) => console.log(err))
                }
            })
            .catch((err) => {
                //   here it should return that the plant haven't created bcz of some errors (((in 400 statuse)))
                console.log(err);
            });
    };

    return (
        <div className="mt-5 boxCard" >
            <form
                onSubmit={addPlant}
                className="d-flex flex-column align-items-center"
            >
                {/* IMAGE */}
                <p className="mb-3">take a photo to your plant</p>
                <div className="card border-0 d-flex justify-content-center align-items-center mb-5 plant" style={{
                    width: "200px",
                    height: "200px",
                    backgroundColor: "#e9e9e9",
                }} >
                    <IconButton
                        aria-label="add image"
                        component="label"
                        style={{ backgroundColor: "#326E62" , display: "flex", flexDirection: "column-reverse" ,width: "45px",height: "45px"}}>
                        
                        <FileBase64 type="file" multiple={false} onDone={({ base64 }) => handleImg(base64)} style={{ color: "#fff", width: "10px", height: "10px" ,backgroundColor: "#326E62" }} />
                        
                        <AddIcon style={{ color: "#fff", width: "50px", height: "50px" }} />
                    </IconButton>
                </div>
                <p>set your plant's information</p>
                <div className="col-12 mb-5">
                    <hr className="mb-5" />
                    <div className="row text-start mb-4">
                        <label className="form-label">Plant name</label>
                        <input
                            type="text"
                            className="form-control"
                            style={{ borderColor: "#326E62" }}
                            value={plant.plantName}
                            onChange={(e) =>
                                setPlant({ ...plant, plantName: e.target.value })
                            }
                        />
                    </div>

                    <div className="row text-start mb-4">
                        <label className="form-label">Plant type</label>
                        <Autocomplete value={value} onChange={(event, newInputValue) => { setValue(newInputValue); }} inputValue={inputValue}
                            onInputChange={(event, newInputValue) => { setInputValue(newInputValue); setPlant((prev) => { return { ...plant, type: newInputValue }; }); }}
                            options={plantsType} style={{ borderColor: "#326E62", padding: "0px" }} renderInput={(params) => (
                                <TextField {...params} label="Choose Type" className="form-control" style={{ borderColor: "#326E62" }} />)} />
                    </div>
                    <div className="row text-start mb-3">
                        <label className="form-label">Plant seeding date</label>
                        <input
                            value={plant.plantAge}
                            onChange={(e) => setPlant({ ...plant, plantAge: e.target.value })}
                            type="date"
                            className="form-control"
                            style={{ borderColor: "#326E62" }}
                        />
                    </div>
                </div>
                <Button type="submit" variant="contained" className="mb-3" style={{ backgroundColor: "#326E62", width: 200, height: 40, fontFamily: "cursive" }}>Add My Plant 🌿</Button>
                <Link to={"/"} style={{ textDecoration: "none" }}>
                    <Button
                        variant="text"
                        style={{ borderColor: "#326E62", color: "#326E62", width: 200 }}
                    >
                        Cancel
                    </Button>
                </Link>
            </form>
        </div>
    );
}

export default Create;