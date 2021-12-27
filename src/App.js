import "./App.css";
import React, { useEffect, useState } from "react";
import Login from "./Componenets/Login";
import SignUp from "./Componenets/SignUp";
import Home from "./Componenets/Home";
import Settings from './Componenets/Settings';
import Profile from "./Componenets/Profile";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserContext } from './UserContext';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase-config";



function App() {
  const [userDetails, setuserDetails] = useState({});
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const docRef = doc(db, "users", uid);
        getDoc(docRef).then((docSnap)=>{setuserDetails(docSnap.data())});
      } 
    });
  }, [])

  return (
    <Router>

      <UserContext.Provider value={userDetails} >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/:id" element={<Profile />} />
        </Routes>
      </UserContext.Provider>


    </Router>
  );
}

export default App;
