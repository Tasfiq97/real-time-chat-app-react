import React from 'react';
import styled from "styled-components"
import robot from "../assets/robot.gif"
const Welcome = ({currentUser}) => {
    return (
     <Container>
               <img src={robot} alt="" />
               <h2>Welcome, <span>{currentUser.name}</span></h2>
               <h3>please select one chat to start messaging</h3>
     </Container>
    );
};
const Container=styled.div`
display: flex;
justify-content: center;
align-items: center;
color: white;
flex-direction: column;
img {
  height: 20rem;
}
span {
  color: #4e0eff;
}
`;

export default Welcome;