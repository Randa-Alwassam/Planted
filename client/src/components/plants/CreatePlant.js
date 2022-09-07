import React, { Component, useState } from "react";
import css from './Styles.module.css';
import { useEffect } from 'react';
import axios from "axios";
import { BrowserRouter, Switch, Route, Link, useHistory } from "react-router-dom";

function Create(props) {

    const history = useHistory();

    const [data, setData] = React.useState({
        name: "",
        position: "",
        games: ["Undecided", "Undecided", "Undecided"]
    });

    const [errors, setErrors] = React.useState({
        nameError: "",
    });

    const [update, setUpdat] = React.useState(false);

    const [disabledBtton, setDisabledBtton] = React.useState(true)
    const handleOnChange = (event) => {
        event.preventDefault();
        setData({ ...data, [event.target.name]: event.target.value })
        console.log(event.target.name);

        // --- to handle the disabled button feature ---
        // if (event.target.name == "name") {
        //     if (event.target.value.length > 2) {
        //         setDisabledBtton(false)
        //     } else {
        //         setDisabledBtton(true)
        //     }
        // }

        if (event.target.name == "name" && event.target.value.length > 2) {
            setDisabledBtton(false)
        } if (event.target.name == "name" && event.target.value.length < 3) {
            setDisabledBtton(true)
        }
        // --- the end of the disabled button feature ---

        setUpdat(!update)
    }

    const onsubmitFunction = (event) => {
        //prevent default behavior of the submit
        event.preventDefault();

        console.log(axios)
        axios.post("http://localhost:8000/api/players/new", { ...data })
            .then(res => {
                console.log(res);
                if ('error' in res.data) {
                    setErrors({ ...errors, nameError: res.data.error.errors.name.message })
                } else {
                    setErrors({ ...errors, nameError: "" })
                    history.push('/');
                }
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        console.log("--In useEffect --");
    }, [update])

    return (
        <div className={css.App}>
            <div className={css.box}>
                <div className={css.divCenter}>
                    <p>Add Player</p>
                </div>

                {/* ----- the div the display the errors -----  */}
                {(errors.nameError != '') ? (<div className="alert alert-danger">{errors.nameError}</div>) : null}
                {/* ----- the end of the div errors ----- */}

                <form onSubmit={onsubmitFunction} className={css.form}>
                    <div className={css.formDive}>
                        <label>Player Name</label>
                        <input type="text" name="name" value={data.name} onChange={handleOnChange} required />
                    </div>
                    <div className={css.formDive}>
                        <label>Preferred Position</label>
                        <input type="text" name="position" value={data.position} onChange={handleOnChange} />
                    </div>
                    <div className={css.divCenter}>
                        <input type="submit" value='Submit' className='btn btn-primary mx-2' disabled={disabledBtton} />
                        <Link to='/' className={css.btnCancel} >Cancel</Link>
                    </div>

                </form>
            </div>
        </div>
    );

}

export default Create;