import './App.css';

import {initializeApp} from "firebase/app";
import {useAuthState} from "react-firebase-hooks/auth";
import React from "react";
import {getAuth} from "@firebase/auth";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./ui/AppRouter";
import {firebaseConfig} from "./globals";
import createTheme from "@mui/material/styles/createTheme";
import CircularProgress from "@mui/material/CircularProgress";
import MainPage from "./pages/MainPage";


initializeApp(firebaseConfig);
const auth = getAuth();


const App = () => {
    const [firebaseUser, loading, error] = useAuthState(auth);
    console.log(firebaseUser);

    if (loading) return <div className="main-loader"><CircularProgress color="warning" /></div>

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
                <MainPage>
                    <AppRouter user={firebaseUser}/>
                </MainPage>
            </BrowserRouter>
        </ThemeProvider>

    )
}

export default App;
