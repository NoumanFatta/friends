import "./App.css";
import React, { useEffect } from "react";
import Login from "./Componenets/Login";
import SignUp from "./Componenets/SignUp";
import Home from "./Componenets/Home";
import Settings from './Componenets/Settings';
import Profile from "./Componenets/Profile";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase-config";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./Componenets/state";



function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { addUser } = bindActionCreators(actionCreators, dispatch);
        const uid = user.uid;
        const docRef = doc(db, "users", uid);
        getDoc(docRef).then((docSnap) => {
          addUser(docSnap.data())
        });
      }
    });
  }, [dispatch])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/:id" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
