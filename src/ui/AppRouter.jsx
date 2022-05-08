import React from 'react';
import {
    Routes,
    Route,
} from "react-router-dom";
import PageNotFound404 from "../pages/404";
import FirebaseGoogleAuth2Login from "../pages/FirebaseGoogleAuth2Login";
import GroupsList from "../pages/GroupsList";

const AppRouter = (props) => {

    if (props.user === null) {
        return <Routes>
            <Route path="/login" element={<FirebaseGoogleAuth2Login/>}/>
            <Route path="*" element={<PageNotFound404/>}/>
        </Routes>
    } else {
        return <Routes>
            <Route path="/" element={<GroupsList/>}/>
            <Route path="/about-us" element={<div>Санта-проект для курса SQR</div>}/>
            <Route path="/groups" element={<GroupsList/>}/>
            <Route path="*" element={<PageNotFound404/>}/>
        </Routes>
    }
}

export default AppRouter;