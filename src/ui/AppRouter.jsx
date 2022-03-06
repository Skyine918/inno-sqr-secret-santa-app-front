import React from 'react';
import {
    Routes,
    Route,
} from "react-router-dom";
import {PUBLIC_ROUTES, ROUTES_UNDER_AUTH} from "../routes";
import PageNotFound404 from "../pages/404";
import FirebaseGoogleAuth2Login from "../pages/FirebaseGoogleAuth2Login";

const AppRouter = (props) => {

    if (props.user === null) {
        return <Routes>
            {
                PUBLIC_ROUTES.map(({path, component}) => {
                    return <Route key={path} path={path} element={component} exact={true}/>
                })
            }
            <Route path="/login" element={<FirebaseGoogleAuth2Login/>}/>
            <Route path="*" element={<FirebaseGoogleAuth2Login/>}/>
        </Routes>
    } else {
        return <Routes>
            {
                ROUTES_UNDER_AUTH.map(({path, component}) => {
                    return <Route key={path} path={path} element={component} exact={true}/>
                })
            }
            <Route path="*" element={<PageNotFound404/>}/>
        </Routes>
    }
}

export default AppRouter;