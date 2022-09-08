import React, { Component, useState , useContext } from "react";
import css from "./css/Navbar.module.css";
import { useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route, Link, useHistory, } from "react-router-dom";
// import cutlogo from "./img/login.png"
import { useRadioGroup } from "@mui/material";
import AppContext from "../context";


function Navbar(props) {
  // const {user, setUser , signed, setSigned} = useContext(AppContext);

  const [welcome, setWelcome] = useState("Planter");
  const { user, setUser, signed, setSigned } = useContext

  // --- to import the images from the folder img/navbar * ---
  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }
  const images = importAll(
    require.context("./img/navbar", false, /\.(png|jpe?g|svg)$/)
  );
  // --- end * ---

  useEffect(() => {
    console.log("/* In useEffect */");
  }, []);

  return (
    <div>
      {/* <div className={css.sidebar}> */}
                <div>
                    <div className={css.inside}>
                        {/* <Link to={'/users/plants/'+ user._id}><img src={images['home.png']} className={css.img} /></Link> */}
                        <Link to={'/'}><img src={images['home.png']} className={css.img} /></Link>
                        <Link to={'/login'}><img src={images['user.png']} className={css.img} /></Link>
                        <Link to={'/chat'}><img src={images['chat.png']} className={css.img} /></Link>
                        <Link to={'/users/plants/'}><img src={images['s.png']} className={css.img} /></Link>
                        <Link to={'/info'}><img src={images['help.png']} className={css.img} /></Link>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
    // </div>
  );
}

export default Navbar;
