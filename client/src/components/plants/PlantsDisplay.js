import React, { Component, useState, useEffect } from "react";
import css from './Styles.module.css';
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import add from './add.svg';

function Display(props) {
    const [plants, setPlants] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/plants/' + id)
            .then(res => {
                console.log(res.data);
                setPlants(res.data)
            })
            .catch((error) => console.log(error))
    }, [])

    return (
        <div className="plants-container">
            {plants.map(plant => (
                <div key={plant._id}>
                    <Link to={"/plants/tasks/" + plant._id}>
                        {/* <div><img src={plant.image} /></div> */}
                        <div> {plant.plantName} </div>
                    </Link>
                </div>
            ))}
            <Link to="/plants/new"><img src={add}></img></Link>
        </div>
    )
}
export default Display;