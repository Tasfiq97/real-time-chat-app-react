import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import ChatContainer from '../Components/ChatContainer';
import Contact from '../Components/Contact';
import Welcome from '../Components/Welcome';
import {io} from "socket.io-client"

const Chat = () => {
    const socket=useRef();

    const navigate=useNavigate();
    const [currentUser,setCurrentUser]=useState(undefined);
    const [contact,setContact]=useState([]);
    const [currentChat,setCurrentChat]=useState(undefined);
    const [isLoaded,setIsLoaded]=useState(false);

    useEffect(()=>{
       const fetch=async()=>{
        if(!localStorage.getItem("chat-app-user")){
            navigate("/login")
        }
        else{
            setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
            setIsLoaded(true);
        }
       }
       fetch();
    },[])

    useEffect(()=>{
        if(currentUser){
            socket.current=io("https://warm-earth-14847.herokuapp.com")
            socket.current.emit("add-user",currentUser._id);
        }
    },[currentUser])
    useEffect(()=>{
        const fetchData=async()=>{
         if(currentUser){
             if(currentUser.isAvatarImageSet){
         
              const data=await axios.get(`https://warm-earth-14847.herokuapp.com/api/auth/allusers/${currentUser._id}`);
              console.log(data.data);
               setContact(data.data);
             }
             else{
                 navigate("/setAvatar");
                }
            }
        }
        fetchData()
    },[currentUser])

    const handleChangeChat=(chat)=>{
        setCurrentChat(chat);
    }


    return (
        <Container>
            <div className="container">
               <Contact contacts={contact} currentUser={currentUser} changeChat={handleChangeChat}></Contact>
               {
                   isLoaded && currentChat===undefined?(
                       <Welcome currentUser={currentUser}/>
                   ):(
                       <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>
                   )
               }
            </div>
        </Container>
    );
};

const Container= styled.div`
display:flex;
height:100vh;
width:100vw;
flex-direction:column;
align-items:center;
justify-content:center;
background-color:#1F1D3A;
.container{
    height:80vh;
    width:80vw;
    background-color:#1F1D2A;
    display:grid;
    grid-template-columns:25% 75%;
    @media screen and (min-width:320px) and (max-width:480px){
        grid-template-columns:40% 60%;
        
    }

}
`;

export default Chat;