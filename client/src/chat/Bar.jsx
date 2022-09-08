import React from 'react'
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Fragment } from "react";
import ChatIcon from '@mui/icons-material/ForestTwoTone';
import './bar.css';
export default function Bar() {

    return (
        <Fragment className="opBcolor">
            <Box m={3} mr={6} className="opBcolor">
                <AppBar position="static" className='noColor'>
                    <Toolbar className='noColor'>
                        <Box mr={2}>
                            <ChatIcon fontSize={'large'}/>
                        </Box>
                        <Typography variant="h6">
                            Planted Chat
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </Fragment>
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