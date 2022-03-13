import React from 'react';
import {getAuth} from "@firebase/auth";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import Container from "@mui/material/Container";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";


const settings = ['Profile', 'Account', 'Dashboard'];


const Navigation = () => {
    const auth = getAuth();
    const [user, loading, error] = useAuthState(auth);

    if (error) console.log("Auth error:",  error)

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

    let activeMainPageStyle = window.location.pathname === "/" ? "underline" : "none";
    let activeDonatePageStyle = window.location.pathname === "/groups" ? "underline" : "none";
    let activeRulesStyle = window.location.pathname === "/rules" ? "underline" : "none";

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        <Link id="nav-logo" to="/" style={{display: "flex", color: "aliceblue", textDecoration: "none"}}>
                            <img style={{height: "2em", width: "2em", borderRadius: "50%"}} src="red-santa-hat-flat.png" alt=""/>
                            <span style={{lineHeight: "2em", marginLeft: "0.5em"}}>Secret Santa Web</span>
                        </Link>
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center"><Link to="/">MAIN</Link></Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center"><Link to="/groups">GROUPS</Link></Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', alignItems: 'center' } }}>
                        <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block', margin: 0 }}>
                            <Link style={{ textDecoration: 'none', color: "white", textDecorationLine: activeMainPageStyle }} to="/">MAIN</Link>
                        </Button>
                        <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block', margin: 0 }}>
                            <Link style={{ textDecoration: 'none', color: "white", textDecorationLine: activeDonatePageStyle }} to="/groups">GROUPS</Link>
                        </Button>
                        {/*<Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block', margin: 0 }}>*/}
                        {/*    <Link style={{ textDecoration: 'none', color: "white", textDecorationLine: activeRulesStyle}} to="/rules">ПРАВИЛА</Link>*/}
                        {/*</Button>*/}
                        {/*<Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block', margin: 0 }}>*/}
                        {/*    <Link style={{ textDecoration: 'none', color: "white", textDecorationLine: activeMemoriesStyle}} to="/memories">MEMORIES</Link>*/}
                        {/*</Button>*/}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        {/*<IconButton size="large" aria-label="show 4 new mails" color="inherit">*/}
                        {/*    <Badge badgeContent={4} color="error">*/}
                        {/*        <MailIcon />*/}
                        {/*    </Badge>*/}
                        {/*</IconButton>*/}
                        {/*<IconButton*/}
                        {/*    size="large"*/}
                        {/*    aria-label="show 17 new notifications"*/}
                        {/*    color="inherit"*/}
                        {/*>*/}
                        {/*    <Badge badgeContent={17} color="error">*/}
                        {/*        <NotificationsIcon />*/}
                        {/*    </Badge>*/}
                        {/*</IconButton>*/}

                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={user ? user.displayName : "username"} src={user !== null ? user.photoURL : ""} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
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
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                            <MenuItem key="sign-out" onClick={() => auth.signOut()}>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );

    // return (
    //     <Box sx={{flexGrow: 1}}>
    //         <AppBar position="static">
    //             <Toolbar>
    //                 <IconButton
    //                     size="large"
    //                     edge="start"
    //                     color="inherit"
    //                     aria-label="menu"
    //                     sx={{mr: 2}}
    //                 >
    //                     <MenuIcon/>
    //                 </IconButton>
    //                 <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
    //                     <Link to="/MemoriesPage">Memories</Link>
    //                 </Typography>
    //                 {props.user
    //                     ? <Button color="inherit" onClick={() => {auth.signOut()}}>Logout</Button>
    //                     : <Button color="inherit"><Link to={ROUTES.LOGIN}>Login</Link></Button>
    //                 }
    //
    //             </Toolbar>
    //         </AppBar>
    //     </Box>
    // );
}

export default Navigation;