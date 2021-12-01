import "./App.css";
import Login from "./Componenets/Login";
import SignUp from "./Componenets/SignUp"
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}>
   </Route>
      <Route path="/signup" element={<SignUp />}></Route>
    </Routes>
  );
}

export default App;
