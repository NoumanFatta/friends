import "./App.css";
import Login from "./Componenets/Login";
import SignUp from "./Componenets/SignUp";
import Home from "./Componenets/Home";
import Posts from './Componenets/Posts'
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path = "posts" element = {<Posts/>} > </Route>
    </Routes>
  );
}

export default App;
