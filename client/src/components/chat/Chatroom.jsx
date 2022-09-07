import React from 'react'
import { useEffect, useState } from "react";
import './chat.css';

import axios from 'axios'
import Chat from './Chat';


export default function Chatroom() {
    // states:
    const [loadingMsg,setLoadingMsg] = useState(false)
    const [loadingUser,setLoadingUser] = useState(false)
    const [chatMessages, setChatMessages] = useState([]);
    const [refresh,setRefresh] = useState(false)
    const [user, setUser] = useState({
        _id: "",
        username: "",
        plants: [],
        createdAt: "",
        updatedAt: "",
        __v: 0
    });


    // const { id } = useParams();
    useEffect( () => {
        if(!loadingMsg){
            getMessages() 
        }
        if(!loadingUser){
            getUser()
        }
        console.log(chatMessages)
        console.log(user)
    }, [loadingUser,loadingMsg]);


    // helper functions:
    function getMessages(){      
        axios.get('http://localhost:8000/api/messages/')
        .then( res => {
            console.log(res.data)
            console.log(res.data[0].user.username)
            console.log(res.data[0].message)
            setMessagesState(res.data)
            setLoadingMsg(true)
        })
        .catch(err => {console.log(err);})
    }
    
    async function setMessagesState (data){
        await setChatMessages(data);
    }

    function getUser (){
        axios.get('http://localhost:8000/api/users/63184ac9085029b04ed27b43')
        .then(res => {
            console.log(res.data.user)
            setUser(res.data.user);            
            setTimeout(() => {
                setLoadingUser(true)                
                console.log(user);
            }, 1500);
            
        })
        .catch(err => {console.log(err);})
    }

    return (
        <div>
            {!loadingMsg && !loadingUser?
            <p>is loading..</p>
            :
            <Chat chatMessages={chatMessages} user={user} refresh={refresh} setRefresh={setRefresh}/>
            }
        </div>
    );
}
