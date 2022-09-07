import React from 'react'
import { Container, Divider, FormControl, Grid, IconButton, List, ListItem, ListItemText, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Fragment, useEffect, useRef, useState } from "react";
import './chat.css';
import SendIcon from '@mui/icons-material/Send';
import io from "socket.io-client";
import axios from 'axios'


export default function Chat(props) {
    // states:
    const [socket] = useState(() => io(":8000"));
    const [chatMsg, setChatMsg] = useState({
        _id: props.user._id,
        username: props.user.username,
        message: '',
    })
    const [chatMessages, setChatMessages] = useState([...props.chatMessages]);
    const scrollBottomRef = useRef(null);

    useEffect(() => {
        socket.connect(true)
        console.log(chatMessages)
        console.log(chatMsg)
        if (chatMessages.length == 0 || chatMsg._id == '') {
            props.setRefresh(!props.refresh)
        }

        // broadcast listener 1
        socket.on("add_message", (newMessage) => {
            console.log("Adding message");
            console.log(newMessage);
            setChatMessages((prevState) => {
                console.log(prevState);
                return [...prevState, newMessage];
            });
        });

        return () => socket.disconnect(true)

    }, []);

    const handleUserChange = (event) => {
        setChatMsg({ ...chatMsg, [event.target.name]: event.target.value })
    }

    //events:
    function sendMessageToServer() {
        console.log("Sending a message to the server");
        console.log(socket);
        if (chatMsg.user != '' && chatMsg.message != '') {
            postMessageToServer(chatMsg);
        }
    }

    function postMessageToServer() {
        const newMsg = {
            user: chatMsg._id,
            message: chatMsg.message,
        }
        axios.post('http://localhost:8000/api/messages/new', newMsg)
            .then(res => {
                console.log(res);
                const msgToSocket = {
                    user: { _id: chatMsg._id,
                        username: chatMsg.username},
                    message: chatMsg.message,
                }
                socket.emit("handle_message_receive", msgToSocket);
            })
            .catch(err => console.log(err))
    }

    // helper functions:..

    const listChatMessages = chatMessages.map((chatmsg, index) =>
        <ListItem key={index}>
            {/* <ListItemText primary={`${chatmsg.user.username}: ${chatmsg.message}`} /> */}
            <div className={chatmsg.user._id == chatMsg._id ? "text-start" : "text-end"}>
                <p>{chatmsg.user.username} : {chatmsg.message}</p>
            </div>
        </ListItem>
    );

    return (
        <Fragment>
            <Container>
                <Paper elevation={5}>
                    <Box p={3}>
                        <Typography variant="h4" gutterBottom>
                            Happy chatting!
                        </Typography>
                        <Divider />
                        <Grid container spacing={4} alignItems="center">
                            {/* 1 */}
                            <Grid id="chat-window" xs={12} item>
                                <List id="chat-window-messages">
                                    {listChatMessages}
                                    <ListItem ref={scrollBottomRef}></ListItem>
                                </List>
                            </Grid>
                            {/* 2 */}
                            <Grid xs={2} item>
                                <FormControl fullWidth>
                                    <TextField onChange={handleUserChange}
                                        value={chatMsg.username}
                                        label="username"
                                        variant="outlined" name='user' />
                                </FormControl>
                            </Grid>
                            {/* 3 */}
                            <Grid xs={9} item>
                                <FormControl fullWidth>
                                    <TextField onChange={handleUserChange}
                                        value={chatMsg.message}
                                        label="Type your message..."
                                        variant="outlined" name='message' />
                                </FormControl>
                            </Grid>
                            {/* 4 */}
                            <Grid xs={1} item>
                                <IconButton onClick={sendMessageToServer}
                                    aria-label="send"
                                    color="primary">
                                    <SendIcon />
                                </IconButton>
                            </Grid>

                        </Grid>
                    </Box>
                </Paper>
            </Container>
        </Fragment>
    );
}
