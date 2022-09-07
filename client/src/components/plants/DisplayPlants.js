import React, { Component, useState } from "react";
import css from '../css/DisplayPlants.module.css';
import { useEffect } from 'react';
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
            {(plants.length == 0) ?
                (<div className={css.sorry}>
                    <h3 className="mb-5">sorry you don't have any plants ... 🍂</h3>
                    <Link to={'/intro'} className={css.intro}>What is planted ❔</Link>
                </div>)
                :
                (<div>
                    {plants.map((plant) => (
                        <div key={plant._id} className={css.card}>
                            <Link to={"/plants/" + plant._id}>
                                {/* <div><img src={plant.image} /></div> */}
                                <div> {plant.plantName} </div>
                            </Link>
                        </div>
                    ))}
                </div>)
            }
            <Link to="/plants/new" className={css.addbtn}><img src={add}></img></Link>
        </div>
    )
}
export default Display;