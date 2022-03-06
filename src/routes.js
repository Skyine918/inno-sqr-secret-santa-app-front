import {ROUTES} from './globals'
import FirebaseGoogleAuth2Login from "./pages/FirebaseGoogleAuth2Login";
import React from "react";
import MainPage from "./pages/MainPage";

export const PUBLIC_ROUTES = [
    {
        path: ROUTES.MAIN_PAGE,
        component: <MainPage/>
    },
    {
        path: ROUTES.MAIN_PAGE_SLASH,
        component: <MainPage/>
    },
]
export const ROUTES_UNDER_AUTH = [
    {
        path: ROUTES.MAIN_PAGE,
        component: <MainPage/>
    },
    {
        path: ROUTES.MAIN_PAGE_SLASH,
        component: <MainPage/>
    },
    {
        path: ROUTES.MAIN_PAGE,
        component: <FirebaseGoogleAuth2Login/>
    },
]