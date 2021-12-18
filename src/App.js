import "./App.css";
import React, { useEffect, useState } from "react";
import Login from "./Componenets/Login";
import SignUp from "./Componenets/SignUp";
import Home from "./Componenets/Home";
import Settings from './Componenets/Settings';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NameContext, EmailContext, UidContext } from './UserContext';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase-config";



function App() {
  const [userDetails, setuserDetails] = useState({});
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const docRef = doc(db, "users", uid);
        getDoc(docRef).then((doc) => {
          setuserDetails({ ...doc.data(), uid });
        });
      } else {
      }
    });
  }, []);



  return (
    <Router>
      <EmailContext.Provider value={userDetails.email} >
        <UidContext.Provider value={userDetails.uid} >
          <NameContext.Provider value={userDetails.name} >
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/home" element={<Home />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </NameContext.Provider>
        </UidContext.Provider>
      </EmailContext.Provider>

    </Router>
  );
}

export default App;
