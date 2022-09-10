import React from 'react'
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Fragment } from "react";
import ChatIcon from '@mui/icons-material/ForestTwoTone';
import './bar.css';
import plantPic from "../plants/trees.png";
export default function Bar() {

    // --- ui material bar ---
    // return (
    //     <Fragment className="bar">
    //         <Box m={3} mr={6} className="bar">
    //             <AppBar position="static" className='bar'>
    //                 <Toolbar className='bar'>
    //                     <Box mr={2}>
    //                         <ChatIcon fontSize={'large'} />
    //                     </Box>
    //                     <Typography variant="h6">
    //                         Planted Chat
    //                     </Typography>
    //                 </Toolbar>
    //             </AppBar>
    //         </Box>
    //     </Fragment>
    // )

    // --- our bar ---

    return (
        <div className='div-bar'>
            <img src={plantPic} alt="plant in a pote" className='img'/>
            <h3>Planted Chat</h3>
        </div>
    )

}

{/* <Fragment className='opBcolor'>
<p>Here</p>
<Box m={3} mr={6} className="opBcolor">
    <AppBar position="static" className='bar opBcolor'>
        <Toolbar className='bar opBcolor'>
            <Box mr={2}>
                <ChatIcon fontSize={'large'}/>
            </Box>
            <Typography variant="h6">
                Planted Chat
            </Typography>
        </Toolbar>
    </AppBar>
</Box>
</Fragment> */}