import './App.css';

import {initializeApp} from "firebase/app";
import {useAuthState} from "react-firebase-hooks/auth";
import React from "react";
import {getAuth} from "@firebase/auth";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import {BrowserRouter} from "react-router-dom";
import Navigation from "./ui/Navigation";
import AppRouter from "./ui/AppRouter";
import {firebaseConfig} from "./globals";
import createTheme from "@mui/material/styles/createTheme";
import Loader from "./ui/Loader";


initializeApp(firebaseConfig);
const auth = getAuth();


const App = () => {
    const [firebaseUser, loading, error] = useAuthState(auth);
    console.log(firebaseUser);

    if (loading) return <div style={{width: "100%", height: "90vh", position: "relative"}}><Loader centered={true}/>
    </div>

    const theme = createTheme({
        palette: {
            primary: {
                main: '#f76C6C'
            },
            secondary: {
                main: '#f0f0f0'
            }
        }
    });

    return (

        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Navigation/>
                <AppRouter user={firebaseUser}/>
            </BrowserRouter>
        </ThemeProvider>

    )
}

export default App;
