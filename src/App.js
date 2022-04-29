import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Chat from './Pages/Chat';
import Login from './Pages/Login';
import Register from './Pages/Register';
import SetAvatar from './Pages/SetAvatar';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Chat/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/setAvatar' element={<SetAvatar/>}></Route>
    
    </Routes>
    </BrowserRouter>
  );
}

export default App;
