import React from 'react'
import { useEffect, useState, useContext } from "react";
import './chat.css';
import axios from 'axios'
import Chat from './Chat';
import AppContext from "../context"
import Bar from './Bar'
import ChatImg from './ChatImg'
import { useHistory} from "react-router-dom";
import loading from "./loading.gif"



export default function Chatroom() {
    const history = useHistory();
    // states:
    const [loadingMsg, setLoadingMsg] = useState(false)
    const [loadingUser, setLoadingUser] = useState(false)
    const [chatMessages, setChatMessages] = useState([]);
    const [refresh, setRefresh] = useState(false)
    // const [user, setUser] = useState({
    //     _id: "",
    //     username: "",
    //     plants: [],
    //     createdAt: "",
    //     updatedAt: "",
    //     __v: 0
    // });
    const { user, setUser, signed, setSigned } = useContext(AppContext);


    // const { id } = useParams();
    useEffect(() => {
        if (!signed) {
            history.push('/error')
            return;
        }
        if (!loadingMsg) {
            getMessages()
        }
        if (!loadingUser) {
            getUser()
        }
        console.log(chatMessages)
        console.log(user)
    }, [loadingUser, loadingMsg]);


    // helper functions:
    function getMessages() {
        axios.get('http://localhost:8000/api/messages/')
            .then(res => {
                console.log(res.data)
                console.log(res.data[0].user.username)
                console.log(res.data[0].message)
                setMessagesState(res.data)
                setLoadingMsg(true)
            })
            .catch(err => { console.log(err); })
    }

    async function setMessagesState(data) {
        await setChatMessages(data);
    }

    function getUser() {
        axios.get('http://localhost:8000/api/users/' + user._id)
            .then(res => {
                console.log(res.data.user)
                setUser(res.data.user);
                setTimeout(() => {
                    setLoadingUser(true)
                    console.log(user);
                }, 1500);

            })
            .catch(err => { console.log(err); })
    }

    return (
        <div>
            {loadingMsg && loadingUser && signed ?
                <>
                    <Bar />
                    <ChatImg chatMessages={chatMessages} user={user} refresh={refresh} setRefresh={setRefresh} />
                </>
                :
                <img src={loading} alt="loading" style={{borderRadius: "15px"}}/>

            }
        </div>
    );
}
