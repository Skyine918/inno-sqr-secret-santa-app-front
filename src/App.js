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
    const [firebaseUser, loading] = useAuthState(auth);
    if (loading)
        return <div className="main-loader">
        <CircularProgress color="warning" />
    </div>


    return (
        <MainPage>
            <AppRouter user={firebaseUser}/>
        </MainPage>
    )
}

export default App;
