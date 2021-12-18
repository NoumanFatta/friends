import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import SettingsIcon from '@mui/icons-material/Settings';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { NavLink } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { UidContext } from '../UserContext';

const drawerWidth = 240;
function Navbar(props) {
    const id = React.useContext(UidContext)
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [navLinks, setNavLinks] = React.useState('loading')
    React.useEffect(() => {
        if (id) {
            setNavLinks([
                { name: "Profile", link: `/${id}`, icon: <AccountCircleIcon /> },
                { name: "News Feed", link: '/home', icon: <NewspaperIcon /> },
                { name: "Settings", link: `/settings`, icon: <SettingsIcon /> }
            ])
        }

    }, [id])
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />


            <List>
                {
                    navLinks !== 'loading' ?
                        navLinks.map((data, index) => (
                            <NavLink to={data.link}  key={index}>
                                <ListItem button>
                                    <ListItemIcon>
                                        {data.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={data.name} />
                                </ListItem>
                            </NavLink>
                        ))
                        :
                        <div style = {{diplay: 'flex', textAlign: 'center'}} >
                            <CircularProgress style={{ height: '50px', width: '50px'}} color="secondary" />
                        </div>
                }
            </List>

            <Divider />
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Friends
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

        </>
    );
}


export default Navbar;
