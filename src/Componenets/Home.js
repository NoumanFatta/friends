import React,{ useState, useEffect, createContext } from "react";
import SideBar from "./SideBar";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
const Name = createContext();
const ImgUrl = createContext();
const ID = createContext();
const Email = createContext();



export default function Home() {
  const drawerWidth = 240;
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
    <>
      <Name.Provider value={userDetails.name}>
        <ImgUrl.Provider value={userDetails.img}>
          <ID.Provider value={userDetails.uid}>
            <Email.Provider value={userDetails.email} >
              <Box sx={{ display: 'flex' }}>
                <SideBar />
                <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
                  <Toolbar />
                  <h1> Home Page </h1>
                </Box>
              </Box>
            </Email.Provider>
          </ID.Provider>
        </ImgUrl.Provider>
      </Name.Provider>



    </>
  );
}

export { Name, ID, Email }