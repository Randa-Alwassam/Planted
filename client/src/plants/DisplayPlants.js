import React, { Component, useState ,useContext } from "react";
import css from '../components/css/DisplayPlants.module.css';
import { useEffect } from 'react';
import axios from "axios";
import { Link, useParams ,useHistory } from "react-router-dom";
import add from './add.svg';
import noPlants from './noPlant.svg';
import "./Plant.css"
import AppContext from "../context"

function Display(props) {
    const [plants, setPlants] = useState([]);
    const { user, setUser, signed, setSigned } = useContext(AppContext);
    const history = useHistory();

    useEffect(() => {
        if (!signed) {
            history.push('/error')
            return;
        }
        axios.get('http://localhost:8000/api/users/plants/' + user._id)
            .then(res => {
                console.log(res.data);
                setPlants(res.data)
            })
            .catch((error) => console.log(error))
    }, [])

    return (
        <div className="plants-container">
            {(plants.length == 0) ?
                (<div className={css.sorry}>
                    <img src={noPlants} className="mb-5"/>
                    <h3 className="mb-5">sorry you don't have any plants ... 🍂</h3>
                    <Link to={'/intro'} className={css.intro}>What is planted ❔</Link>
                </div>)
                :
                (<div>
                    {plants.map((plant) => (
                        <div key={plant._id} className={css.card}>
                            <Link to={"/plants/tasks/" + plant._id} className={css.alink} style={{display: "flex", alignItems: "center"}}>
                                {typeof plant.image == "undefined" ||  plant.image == "" ? 
                                (<div className="p"></div>) 
                                :(<img src={plant.image} className="plantImage me-2" />)}
                                {/* <div ><img src={plant.image} className="plantImage" /></div>
                                <div className="p"></div> */}
                                <div> {plant.plantName} </div>
                            </Link>
                        </div>
                    ))}
                </div>)
            }
            <Link to={"new/"+user._id} className={css.addbtn}><img src={add}></img></Link>
        </div>
    )
}
export default Display;