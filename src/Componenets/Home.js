import React, { useState, useEffect, createContext } from "react";
// import { Button } from "@material-ui/core";
// import { auth } from "../firebase-config";
// import { signOut, onAuthStateChanged } from "firebase/auth";
// import { useNavigate } from "react-router";
import SideBar from "./SideBar";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";



const Name = createContext();
const ImgUrl = createContext();
const ID = createContext();


export default function Home() {
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
        // User is signed out
        // ...
      }
    });
  }, []);
  return (
    <>

      <Name.Provider value={userDetails.name} >
        <ImgUrl.Provider value={userDetails.img} >
          <ID.Provider value={userDetails.uid} >
            <SideBar />
          </ID.Provider>
        </ImgUrl.Provider>
      </Name.Provider>
    </>
  );
}

export { Name, ImgUrl, ID }
