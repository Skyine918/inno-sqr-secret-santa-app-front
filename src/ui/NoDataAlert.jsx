import React from "react";

function NoDataAlert(props) {
    // noinspection CheckTagEmptyBody
    const resource = props.resource ? props.resource : "data";
    return <div style={{textAlign: "center", height: "400px", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <span style={{backgroundColor: "rgba(200, 255, 200, 100)", padding: "8px 16px", borderRadius: "16px"}}>NO {resource.toUpperCase()}</span>
    </div>
}

export default NoDataAlert