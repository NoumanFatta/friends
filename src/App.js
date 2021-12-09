import "./App.css";
import Login from "./Componenets/Login";
import SignUp from "./Componenets/SignUp";
import Home from "./Componenets/Home";
import PostData from './Componenets/PostData'
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <PostData />
    </>
  );
   {/* <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/home" element={<Home />}></Route>
    </Routes> */}
  
}

export default App;
