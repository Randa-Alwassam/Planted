import React, { Component, useState } from "react";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import css from './Styles.module.css';
import { useEffect } from 'react';
import axios from "axios";
import { BrowserRouter, Switch, Route, Link ,useHistory} from "react-router-dom";

// --- I hope you enjoy my coding, and I hope it helps you 😊 --- Arwa ALZanbaki 

function Delete(props) {
    const { name ,id , update } = props
    const history = useHistory();

    function deleteFunction(id) {
        axios.delete('http://localhost:8000/api/plants/delete/' + id)
        .then(res => {
            console.log(res)
            history.push('/users/plants/')
        })
        .catch((error) => console.log(error))
    console.log(" *** end of deleteing *** ");

        // confirmAlert({
        //     // title: 'Confirm Delete',
        //     message: 'Are you sure you want to remove '+name,
        //     buttons: [
        //         {
        //             label: 'Yes',
        //             onClick: () => {
        //                 console.log(" *** deleteing *** ");
        //                 axios.delete('http://localhost:8000/api/plants/delete/' + id)
        //                     .then(res => console.log(res))
        //                     .catch((error) => console.log(error))
        //                 console.log(" *** end of deleteing *** ");
        //                 (update) ? props.setUpdat(false) : props.setUpdat(true)
        //             }
        //         },
        //         {
        //             label: 'No',
        //             onClick: () => console.log("... Canceled ...")
        //         }
        //     ]
        // });


    }

    return (
        <input type="submit" value='Delete' className={css.btnDelete} onClick={() => deleteFunction(id)} />
    );

}

export default Delete;