import React from 'react';
import {
    Routes,
    Route,
} from "react-router-dom";
import PageNotFound404 from "../pages/404";
import FirebaseGoogleAuth2Login from "../pages/FirebaseGoogleAuth2Login";
import InvitationList from "../pages/InvitationsList";

const AppRouter = (props) => {

    if (props.user === null) {
        return <Routes>
            <Route path="/login" element={<FirebaseGoogleAuth2Login/>}/>
            <Route path="*" element={<PageNotFound404/>}/>
        </Routes>
    } else {
        return <Routes>
            <Route path="/invitations" element={<InvitationList/>}/>
            <Route path="/groups" element={<div>Группы</div>}/>
            <Route path="*" element={<PageNotFound404/>}/>
        </Routes>
    }
}

export default AppRouter;