import React from "react";
import "./loader.css"

function Loader(props) {
    // noinspection CheckTagEmptyBody
    let classes = ['lds-roller'];
    if (props.centeredRelative || props.centered)
        classes.push("relative-centered")
    if (props.centeredAbsolute)
        classes.push("absolute-centered")
    return <div className={classes.join(" ")}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
}

export default Loader