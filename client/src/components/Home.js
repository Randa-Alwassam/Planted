import React, { useState } from "react";
import css from "./Styles.module.css";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Delete from "./Delete";

// MUI Components
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

// IMGs
import empty from "./img/empty.png";

// CSS لو يضاف لملف
const fabStyle = {
  position: "absolute",
  bottom: 36,
  left: 36,
  backgroundColor: "#326E62",
};

function Home(props) {
  const [useEffectDatd, setUseEffectDatd] = React.useState([]);
  const [update, setUpdat] = React.useState(false);

  useEffect(() => {
    console.log("--- I'm in useEffect --- ");
    axios
      .get("http://localhost:8000/api/players/")
      .then((res) => {
        console.log(res.data);
        setUseEffectDatd(res.data);
      })
      .catch((error) => console.log(error));
    setUpdat(true);
    console.log("--- the end of useEffect --- ");
  }, [update]);

  return (
    <>
      <div className="col text-center mt-5">
        <img src={empty} alt="home empty" width="200px" className="mb-4" />
        <h3>Sorry .. there is no plants yet</h3>
        <p style={{ color: "#9d9d9d" }}>
          Click the add button to have track one
        </p>
      </div>
      <Fab color="primary" aria-label="add" style={fabStyle}>
        <AddIcon />
      </Fab>
    </>
  );
}

export default Home;
