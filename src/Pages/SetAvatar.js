import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import loader from "../assets/loader.gif"
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { Buffer } from "buffer";

const SetAvatar = () => {
    const [avatars,setAvatars]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
    const [selectedAvatar,setSelectedAvatar]=useState(undefined);
    const api = `https://api.multiavatar.com/4645646`;
    const navigate=useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem("chat-app-user")){
            navigate("/login")
        }
    },[])

     const setProfilePicture=async()=>{
         if(selectedAvatar===undefined){
             toast.error("please select an avatar",toastOption);
         }
         else{
             const user=await JSON.parse(localStorage.getItem("chat-app-user"));
             const {data}=await axios.post(`https://warm-earth-14847.herokuapp.com/api/auth/setAvatar/${user._id}`,{
                 image:avatars[selectedAvatar],
             })
             if(data.isSet){
                  user.isAvatarImageSet=true;
                  user.avatarImage=data.image;
                  localStorage.setItem("chat-app-user",JSON.stringify(user));
                  navigate("/")
             }
             else{
                 toast.error("please try again",toastOption)
             }
         }
     };

     useEffect( () => {
         const fetch= async()=>{
            const data = [];
            for (let i = 0; i < 4; i++) {
              const image = await axios.get(
                `${api}/${Math.round(Math.random() * 1000)}`
              );
              const buffer = new Buffer(image.data);
              data.push(buffer.toString("base64"));
            }
            setAvatars(data);
            setIsLoading(false);
         }
         fetch();
     
      }, []);
      const toastOption={
        position:"bottom-right",
        autoClose:2000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark",
      }

    return (
        <>
        {
            isLoading? <Container>
                <img src={loader} alt="" />
            </Container>:(

          
            <Container>
                <div className="title-avatar">
                    <h1>pick an avatar as your profile picture</h1>
                </div>
                <div className='avatars'>
                    {
                        avatars.map((avatar,index)=>{
                            return(
                                <div key={index}
                                className={`avatar ${selectedAvatar===index ? "selected":""}`}>
                                   <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={()=>{
                                       setSelectedAvatar(index)
                                   }} />
                                </div>
                            )
                        })
                    }
                    
                </div>
                <button className='btn-submit' onClick={()=>setProfilePicture()}>Set profile picture</button>
            </Container>
              )
            }
            <ToastContainer/>
        </>
    );
};

const Container= styled.div`

display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
gap:3rem;
background-color:#1F1D3A;
height:100vh;
width:100vw;
.loader{
    max-line-size:100%;
}
.title-avatar{
    h1{
        color:white;
    }
}
.avatars{
    display:flex;
    gap:2rem;
    .avatar{
         border:0.3rem solid transparent;
         display:flex;
         justify-content:center;
         align-items:center;
         transition:0.2s ease-in-out;
         padding:0.3rem;
         border-radius:3rem;
         img{
             height:6rem
         }
    }
    .selected{
        border:0.3rem solid #4e0eff;

    }
}
.btn-submit{
    padding:1rem 2rem;
    font-size:1rem;
    text-transform:uppercase;
    color:white;
    border:none;
    background-color:#2F2C79;
    cursor:pointer;
    transition:0.4s ease-in-out;
    &:hover{
        background-color:#1F1D6A;
}

`;

export default SetAvatar;