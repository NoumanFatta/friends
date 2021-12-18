import React, { createContext, useState, useEffect } from "react";
import SideBar from "./SideBar";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import ProfileDetails from "./ProfileDetails";
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const ProfileID = createContext(null);
const ProfileImage = createContext(null);
const ProfileName = createContext(null);


export default function Profile() {
  const { id } = useParams()
  const [userDetails, setuserDetails] = useState({});
  useEffect(() => {
    if (id) {
      const docRef = doc(db, "users", id);
      getDoc(docRef).then((doc) => {
        setuserDetails({ ...doc.data(), uid: id });
      });
    }
  }, [id]);
  const drawerWidth = 240;
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
          <Toolbar />
          <ProfileName.Provider value={userDetails.name} >
            <ProfileImage.Provider value={userDetails.img} >
              <ProfileDetails />
            </ProfileImage.Provider>
          </ProfileName.Provider>
        </Box>
      </Box>
    </>
  );
}

export { ProfileName, ProfileImage }
