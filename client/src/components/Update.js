import React, { Component, useState } from "react";
import css from './Styles.module.css';
import { useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Switch, Route, Link, useParams, useHistory } from "react-router-dom";



function Update(props) {
    const { id } = useParams();
    const history = useHistory();

    const [data, setData] = React.useState({
        name: "",
        position: "",
        games: [],
    });

    const [errors, setErrors] = React.useState({
        nameError: "",
    });

    const handleOnChange = (event) => {
        event.preventDefault();
        setData({ ...data, [event.target.name]: event.target.value })
    }

    const onsubmitFunction = (event) => {
        //prevent default behavior of the submit
        event.preventDefault();
        if (data.name.length < 3) {
            setErrors({ ...errors, nameError: "the name must be at least 3 characters long" })
        } else {
            axios.put("http://localhost:8000/api/players/update/" + id, { ...data })
                .then(res => console.log(res))
                .catch(err => console.log(err));
            setErrors({ ...errors, nameError: "" })
            history.push('/');
        }
    }

    useEffect(() => {
        console.log("--- I'm in useEffect --- ");
        axios.get('http://localhost:8000/api/players/' + id)
            .then(res => {
                console.log(res.data);
                if (res.data.player == null) { history.push('/error') }
                setData({ ...data, name: res.data.player.name , position: res.data.player.position , games: res.data.player.games  })
            })
            .catch((error) => console.log(error));

    }, [])


    return (
        <div className={css.App}>
            <div className={css.box}>
                <div className={css.divCenter}>
                    <Link to='/'>Home</Link>
                    <p>Update an Player</p>
                </div>
                {(errors.nameError != '') ? (<div className="alert alert-danger">{errors.nameError}</div>) : null}
                <form onSubmit={onsubmitFunction} className={css.form}>
                    <div className={css.formDive}>
                        <label>Name</label>
                        <input type="text" name="name" value={data.name} onChange={handleOnChange} required />
                    </div>
                    <div className={css.formDive}>
                        <label>Position</label>
                        <input type="text" name="position" value={data.position} onChange={handleOnChange} required />
                    </div>
                    <div className={css.divCenter}>
                        <input type="submit" value='Update' className={css.btn} />
                        <Link to='/' className={css.btnCancel} >Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default Update;