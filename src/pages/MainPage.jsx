import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GroupsIcon from '@mui/icons-material/Groups';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {Link} from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {getAuth} from "@firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import Button from "@mui/material/Button";
import FirebaseGoogleAuth2Login from "./FirebaseGoogleAuth2Login";

const drawerWidth = 240;

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function MainPage(props) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const auth = getAuth();
    const [user, loading, error] = useAuthState(auth);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    if (!user) {
        return <FirebaseGoogleAuth2Login/>
    }

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{mr: 2, ...(open && {display: 'none'})}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{mr: 2, display: {xs: 'none', md: 'flex'}}}
                    >
                        <Link id="nav-logo" to="/"
                              style={{display: "flex", color: "aliceblue", textDecoration: "none"}}>
                            <img style={{height: "2em", width: "2em", borderRadius: "50%"}} src="red-santa-hat-flat.png"
                                 alt=""/>
                            <span style={{lineHeight: "2em", marginLeft: "0.5em"}}>Secret Santa Web</span>
                        </Link>
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex', alignItems: 'center'}}}>

                        <Link style={{textDecoration: 'none', color: "white", textDecorationLine: true}} to="/"><Button
                            onClick={handleCloseNavMenu} sx={{my: 2, color: 'white', display: 'block', margin: 0}}>
                            SOME PAGE
                        </Button></Link>
                        <Link style={{textDecoration: 'none', color: "white", textDecorationLine: true}} to="/about-us">
                            <Button onClick={handleCloseNavMenu}
                                    sx={{my: 2, color: 'white', display: 'block', margin: 0}}>ABOUT US</Button>
                        </Link>
                    </Box>

                    {user ? (
                        <Button
                            color="secondary"
                            key="1"
                            onClick={handleCloseNavMenu}
                            variant="contained"
                            sx={{marginRight: '12px'}}
                        >
                            {!!user.displayName ? user.displayName : user.email}
                        </Button>
                    ) : (
                        ''
                    )}

                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar alt={user ? user.displayName : "username"} src={user ? user.photoURL : ""}/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {user
                                ? <MenuItem key="sign-out" onClick={() => auth.signOut()}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>
                                : <MenuItem key="sign-in" onClick={() => auth.signOut()}>
                                    <Typography textAlign="center">
                                        <Link className="no-style-link" to="/sign-in">
                                            Sign In
                                        </Link>
                                    </Typography>
                                </MenuItem>}

                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <List>
                    <Link to="/groups"><ListItem button>
                        <ListItemIcon>
                            <GroupsIcon/>
                        </ListItemIcon>
                        <ListItemText primary="My Groups"/>
                    </ListItem></Link>
                </List>
                <Divider/>
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Main open={open} style={{minHeight: "100vh", backgroundColor: "white"}}>
                <DrawerHeader/>
                {props.children}
            </Main>
        </Box>
    );
};