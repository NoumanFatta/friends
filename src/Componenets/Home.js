import React, { useState, useEffect, createContext } from "react";
// import { Button } from "@material-ui/core";
// import { auth } from "../firebase-config";
// import { signOut, onAuthStateChanged } from "firebase/auth";
// import { useNavigate } from "react-router";
import SideBar from "./SideBar";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";

export default function Home() {
  const [userDetails, setuserDetails] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const docRef = doc(db, "users", uid);
        getDoc(docRef).then((doc) => {
          setuserDetails(doc.data());
        });
      } else {
        // User is signed out
        // ...
      }
    });
    return () => {};
  }, []);
  return (
    <>
      <SideBar username = {userDetails.name} imgURL={userDetails.img} />
    </>
  );
}


