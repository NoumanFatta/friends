import React from 'react'
import SettingContent from './SettingContent';
import Box from '@mui/material/Box';
import SideBar from './SideBar'
import Toolbar from '@mui/material/Toolbar';



const drawerWidth = 240;

function Settings() {

    return (
        <Box sx={{ display: 'flex' }}>
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
            <Toolbar />
            <SettingContent />
        </Box>
    </Box>

    )
}

export default Settings
