import React, { Component, useState } from "react";
import css from './Styles.module.css';
import { useEffect } from 'react';
import axios from "axios";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Delete from "./Delete";

// --- I hope you enjoy my coding, and I hope it helps you 😊 --- Arwa ALZanbaki 

function Home(props) {

    const [useEffectDatd, setUseEffectDatd] = React.useState([]);
    const [update, setUpdat] = React.useState(false);

    useEffect(() => {
        console.log("--- I'm in useEffect --- ");
        axios.get('http://localhost:8000/api/players/')
            .then(res => {
                console.log(res.data);
                setUseEffectDatd(res.data)
            })
            .catch((error) => console.log(error))
        setUpdat(true)
        console.log("--- the end of useEffect --- ");
    }, [update])


    return (

        <h1>hiiiiiiiii</h1>
        // <div className={css.box}>
        //     <div className={css.divCenter}>
        //         <Link to='/'>Manage Players</Link> |
        //         <Link to='/status/game/'>Manage Player Status</Link>
        //     </div>
        //     <div>
        //         <div className={css.divCenter}>
        //             <Link to='/'>List</Link> |
        //             <Link to='/new'>Add Player</Link>
        //         </div>
        //         {/* ------------------------- */}
        //         {(useEffectDatd.length == 0) ? null :
        //             (<table className="table table-dark table-striped mt-3 text-center">
        //                 <thead>
        //                     <tr>
        //                         <th scope="col">Team Name</th>
        //                         <th scope="col">Preferres Position</th>
        //                         <th scope="col">Actions</th>
        //                     </tr>
        //                 </thead>
        //                 <tbody>
        //                     {useEffectDatd.map(data => (
        //                         <tr key={data._id} >
        //                             <td><Link to={'/' + data._id}>{data.name}</Link></td>
        //                             <td>{data.position}</td>
        //                             <td>
        //                                 <Link className={css.btnUpdate} to={'/edit/' + data._id}>update</Link>
        //                                 <Delete name={data.name} id={data._id} update={update} setUpdat={setUpdat}/>
        //                             </td>
        //                         </tr>
        //                     ))}
        //                 </tbody>
        //             </table>)}
        //         {/* ------------------------- */}
        //     </div>
        // </div>
    );

}

export default Home;