import React from "react";

function LoadingErrorAlert(props) {
    // noinspection CheckTagEmptyBody
    const resource = props.resource ? props.resource : "data";
    return <div style={{textAlign: "center", height: "400px", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <span style={{backgroundColor: "rgba(255, 150, 150, 100)", padding: "8px 16px", borderRadius: "16px"}}>Error loading {resource.toUpperCase()}</span>
    </div>
}

export default LoadingErrorAlert