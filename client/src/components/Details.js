import React, { Component, useState } from "react";
import css from './Styles.module.css';
import { useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Switch, Route, Link, useParams, useHistory } from "react-router-dom";

// --- I hope you enjoy my coding, and I hope it helps you 😊 --- Arwa ALZanbaki 

function OneInfo(props) {
    const { id } = useParams();
    const history = useHistory();

    const [useEffectDatd, setUseEffectDatd] = React.useState({
        player : {
            name: '',
            position:'',
            games:[]
        }
    });

    useEffect(() => {
        console.log("--- I'm in useEffect --- ");
        axios.get('http://localhost:8000/api/players/' + id)
            .then(res => {
                console.log(res.data);
                if (res.data.player == null) { history.push('/error') }
                setUseEffectDatd(res.data);
            })
            .catch((error) => console.log("erro: " + error))
    }, [])

    return (
        <div className={css.App}>
            <div className={css.box}>
                <div className={css.divCenter}>
                    <h1>{useEffectDatd.player.name}</h1>
                    <h2>{useEffectDatd.player.position}</h2>
                    {useEffectDatd.player.games.map((player,i)=>
                    <div key={i}>
                        <p>In Game {i+1} - {player}</p>
                    </div>
                    )}
                    <Link to='/'>Home</Link>
                </div>
            </div>
        </div>
    );

}

export default OneInfo;