import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AddPostButton from './AddPostButton'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase-config';
import { collection, query, where, getDocs } from "firebase/firestore";
import { Link } from 'react-router-dom'

export default function Home() {
  const [search, setSearch] = useState('');
  const [Data, setData] = useState({})

  
  useEffect(() => {
    async function show() {
      setData({})
      const q = query(
        collection(db, "users"),
        where("fullname", ">=", search),
        where("fullname", "<=", search + "\uf8ff")
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (search !== '')
          setData({ name: doc.data().firstName, id: doc.data().uid })
      });
    }
    show();
  }, [search]);

  const drawerWidth = 240;
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
          <Toolbar />
          <Toolbar />
          <AddPostButton />
          <Toolbar />
          <input type="search" onChange={(e) => { setSearch(e.target.value.toLowerCase().replace(/\s/g, '')) }} className="inputText" />
          <p>  <Link to={`/${Data.id}`} > {Data.name} </Link> </p>
        </Box>
      </Box>
    </>
  );
}
