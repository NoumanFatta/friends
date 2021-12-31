import React from "react";
import SideBar from "./SideBar";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AddPostButton from './AddPostButton'



export default function Home() {

  const drawerWidth = 240;
  return (
    <>
        <Box sx={{ display: 'flex' }}>
          <SideBar />
          <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
            <Toolbar />
            <AddPostButton />
          </Box>
        </Box>
 
    </>
  );
}
