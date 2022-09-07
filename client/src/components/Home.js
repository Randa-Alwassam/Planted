import React, { Component, useState ,useContext } from "react";
import css from './css/Styles.module.css';
import image from "./img/logo_picture.svg"
import planted from "./img/planted.png"
import { useEffect } from 'react';
import axios from "axios";
import { BrowserRouter, Switch, Route, Link ,useHistory} from "react-router-dom";
import AppContext from "../context"


function Home(props) {
    const history = useHistory();
    const {user, setUser} = useContext(AppContext);

    const [data , setData] = useState({
        username: "",
        plants: []
    })

    const [errors, setErrors] = React.useState({
        nameError: "",
    });

    const onsubmitFunction = (event) => {
        //prevent default behavior of the submit
        event.preventDefault();

        console.log(axios)
        axios.post("http://localhost:8000/api/users/new", { ...data })
            .then(res => {
                console.log(res);
                if ('error' in res.data) {
                    setErrors({ nameError: res.data.error.errors.username.message })
                } else {
                    setErrors({ nameError: "" })
                    setUser(res.data.user)
                    history.push('/');
                }
            })
            .catch(err => console.log(err));
    }

    const handleOnChange = (event) => {
        //prevent default behavior of the submit
        event.preventDefault();
        setErrors({ nameError: "" })
        setData({ ...data, [event.target.name]: event.target.value })
        console.log(event.target.name);
    }

    useEffect(() => {
        console.log("--- I'm in useEffect --- ");
    }, [])


    return (
        <div className={css.home}>
            <img src={image}/>
            <img src={planted} className="mt-5 mb-3"/>
            <div>
                {/* ----- the div the display the errors -----  */}
                {(errors.nameError != '') ? (<div className="alert alert-danger">{errors.nameError}</div>) : (<div className={css.nulldiv} ></div>)}
                {/* ----- the end of the div errors ----- */}

                <form onSubmit={onsubmitFunction}>
                    <div className="d-flex flex-column">
                        <input type="text" name="username" value={data.username} onChange={handleOnChange} required  className={css.input}/>
                        <input type="submit" value='Signup' className={css.loginbtn} />
                    </div>
                </form>
            </div>
        </div>

    );
    }

export default Home;
