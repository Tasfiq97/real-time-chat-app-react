import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import logo from "../assets/logo.svg"
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

const FormContainer= styled.div`
height:100vh;
width:100vw;
display:flex;
flex-direction:column;
justify-content:center;
gap:1rem;
align-items:center;
background-color:#1F1D3A;
.brand{
    display:flex;
    align-items:center;
    gap:1rem;
    justify-content:center;
    img{
        height:5rem;

    }
    h1{
        color:white;
        text-transform:uppercase;
    }
}
    form{
        display:flex;
        flex-direction:column;
        justify-content:center;
        gap:2rem;
        background-color:#022D42;
        border-radius:2rem;
        padding:3rem 4rem;
        input{
            background-color:transparent;
            padding:0.75rem;
            border:.1rem solid #1F1D3A;
            border-radius:0.4rem;
            color:white;
            font-size:1 rem:
            width:100%;
            &:focus{
                border: 0.1rem solid #62FBD4;
                outline:none;
            }
        }
        button{
            padding:1rem 2rem;
            font-size:1rem;
            text-transform:uppercase;
            color:white;
            border:none;
            background-color:#2F2C59;
            cursor:pointer;
            transition:0.4s ease-in-out;
            &:hover{
                background-color:#1F1D3A;


            }
        }
        span{
           color:white;
           text-transform:uppercase;
           a{
               text-decoration:none;
               color:red;
               padding:1rem;
               font-weight:bold;
           }

       }
    }

`;
const Login = () => {

    const navigate=useNavigate();

 const [login,setLogin]=useState({});

 useEffect(()=>{
     if(localStorage.getItem("chat-app-user")){
         navigate("/")
     }
 },[])

 const handleValidation=()=>{
     const {name, password,confirmPassword}=login;
     if(password=== ""){
          toast.error("passwords should be filled",{
              position:"bottom-right",
              autoClose:3000,
              pauseOnHover:true,
              draggable:true,
              theme:"dark",

          });
          return false;
     }
     else if(name.length===""){
        toast.error("name has to filled",{
            position:"bottom-right",
            autoClose:2000,
            pauseOnHover:true,
            draggable:true,
            theme:"dark",

        });
        return false;
     }
     else if(password.length<8){
        toast.error("password should be greater than 8 characters",{
            position:"bottom-right",
            autoClose:2000,
            pauseOnHover:true,
            draggable:true,
            theme:"dark",

        });
        return false;
     }
      return true;
     
 }
    const handleSubmit= async(e)=>{
            e.preventDefault()
            if(handleValidation()){
                const {name, password}=login;
                const {data}=await axios.post("https://warm-earth-14847.herokuapp.com/api/auth/login",{
                    name,password,
                })
                if(data.status===false){
                    toast.error(data.msg,{
                         position:"bottom-right",
                            autoClose:2000,
                            pauseOnHover:true,
                            draggable:true,
                            theme:"dark",
                
                    });
                    }
                    if(data.status===true){
                        localStorage.setItem("chat-app-user",JSON.stringify(data.user));
                        navigate("/")
                    }
                }

            }
        
        
        
    const handleChange=(e)=>{
         const field=e.target.name;
         const value=e.target.value;
         const newLogin={...login};
          newLogin[field]=value;
          setLogin(newLogin);

    }
    return (
        <>
            <FormContainer>

                <form onSubmit={(e)=>handleSubmit(e)} >
                <div className='brand'>
                    <img src={logo} alt="" />
                    <h1>Chat Online</h1>
                </div>
                     <input required type="text"
                     placeholder='Username'
                     name='name'
                     onChange={(e)=>handleChange(e)}
                        min="3"
                      />
                       
                       <input required type="password"
                     placeholder='Password'
                     name='password'
                     onChange={(e)=>handleChange(e)}
                     
                      />
                      
                      <button type='submit'>Login user</button>
                      <span>Don't have an account?<Link to="/register">Register</Link></span>
                </form>
            </FormContainer>
            <ToastContainer/>
        </>
    );
    
    }

export default Login;