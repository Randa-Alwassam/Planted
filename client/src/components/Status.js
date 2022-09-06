import React, { Component, useState } from "react";
import css from './Styles.module.css';
import { useEffect } from 'react';
import axios from "axios";
import { BrowserRouter, Switch, Route, Link, useHistory, useParams } from "react-router-dom";
import Delete from "./Delete";

// --- I hope you enjoy my coding, and I hope it helps you 😊 --- Arwa ALZanbaki 

function Status(props) {
    const { number } = useParams();

    const [useEffectDatd, setUseEffectDatd] = React.useState([]);
    const [update, setUpdat] = React.useState(false);

    async function handleOnClick(id, e) {
        // --- to fetch the player data (get) and edit the game status then update (put) the player database ---
        console.log("*************************************");
        axios.get('http://localhost:8000/api/players/' + id)
            .then(res => {
                const newGames = res.data.player.games;
                newGames[number - 1] = e.target.value;
                const updatedPlayer = {...res.data.player , games: newGames}
                axios.put("http://localhost:8000/api/players/update/" + id, { ...updatedPlayer })
                    .then(res => {
                        console.log(res);
                        setUpdat(!update);
                    })
                    .catch(err => console.log(err));
                    
            })
            .catch((error) => console.log("erro: " + error))
        // setUpdat(!update)
    }

    useEffect(() => {
        console.log("--- I'm in useEffect --- ");
        axios.get('http://localhost:8000/api/players/')
            .then(res => {
                console.log(res.data);
                setUseEffectDatd(res.data)
            })
            .catch((error) => console.log(error))
        // setUpdat(true)
        console.log("--- the end of useEffect --- ");
    }, [update])


    return (
        <div className={css.box}>
            <div className={css.divCenter}>
                <Link to='/'>Manage Players</Link> |
                <Link to='/status/game/'>Manage Player Status</Link>
            </div>
            <div>
                <div className={css.divCenter}>
                    <h1>Player Status - Game {number}</h1>
                    <div className={css.divCenter}>
                        <Link to='/status/game/1'>Game 1</Link> |
                        <Link to='/status/game/2'>Game 2</Link> |
                        <Link to='/status/game/3'>Game 3</Link>
                    </div>
                </div>
                {/* ------------------------- */}
                {(useEffectDatd.length == 0) ? null :
                    (<table className="table table-dark table-striped mt-3 text-center">
                        <thead>
                            <tr>
                                <th scope="col">Team Name</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {useEffectDatd.map(data => (
                                <tr key={data._id} >
                                    <td><Link to={'/' + data._id}>{data.name}</Link></td>
                                    {(number == undefined || (number > 3 || number < 0)) ?
                                        (<td></td>) :
                                        (data.games[number - 1] == "Playing" ?
                                                (<td>
                                                    <input type="submit" value='Playing' onClick={(e) => handleOnClick(data._id, e)} className="btn btn-success mx-2" />
                                                    <input type="submit" value='Not Playing' onClick={(e) => handleOnClick(data._id, e)} className="btn btn-outline-secondary mx-2" />
                                                    <input type="submit" value='Undecided' onClick={(e) => handleOnClick(data._id, e)} className="btn btn-outline-secondary mx-2" />
                                                </td>)

                                                : (data.games[number - 1] == "Not Playing") ?
                                                    (<td>
                                                        <input type="submit" value='Playing' onClick={(e) => handleOnClick(data._id, e)} className="btn btn-outline-secondary mx-2" />
                                                        <input type="submit" value='Not Playing' onClick={(e) => handleOnClick(data._id, e)} className="btn btn-danger mx-2" />
                                                        <input type="submit" value='Undecided' onClick={(e) => handleOnClick(data._id, e)} className="btn btn-outline-secondary mx-2" />
                                                    </td>)

                                                    : (<td>
                                                        <input type="submit" value='Playing' onClick={(e) => handleOnClick(data._id, e)} className="btn btn-outline-secondary mx-2" />
                                                        <input type="submit" value='Not Playing' onClick={(e) => handleOnClick(data._id, e)} className="btn btn-outline-secondary mx-2" />
                                                        <input type="submit" value='Undecided' onClick={(e) => handleOnClick(data._id, e)} className="btn btn-warning mx-2" />
                                                    </td>))
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </table>)}
                {/* ------------------------- */}
            </div>
        </div>
    );

}

export default Status;