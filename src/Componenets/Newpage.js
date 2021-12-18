import * as React from 'react';
import Box from '@mui/material/Box';
import SideBar from './SideBar'
import Toolbar from '@mui/material/Toolbar';

const drawerWidth = 240;
function Newpage() {
    return (
        <Box sx={{ display: 'flex' }}>
            <SideBar />
            <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
                <Toolbar />
                <h1>New page</h1>
            </Box>
        </Box>

    )
}

export default Newpage
