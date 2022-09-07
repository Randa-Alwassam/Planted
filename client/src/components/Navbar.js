import React, { Component, useState } from "react";
import css from "./css/Navbar.module.css";
import { useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

function Navbar(props) {
  const [welcome, setWelcome] = useState("Planter");

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
      <div className={css.sidebar}>
        <div className={css.inside}>
          <Link to={"/"}>
            <img src={images["home.png"]} className={css.img} />
          </Link>
          <Link to={"/users/new"}>
            <img src={images["user.png"]} className={css.img} />
          </Link>
          <Link to={"/users/chat"}>
            <img src={images["chat.png"]} className={css.img} />
          </Link>
          <Link to={"/users/chat"}>
            <img src={images["search.png"]} className={css.img} />
          </Link>
        </div>
        <Link to={"/"}>
          <img src={images["help.png"]} className={css.img} />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
