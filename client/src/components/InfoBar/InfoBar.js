import React from "react";
import "./InfoBar.css"
import close from "../../icons/closeIcon.png"
import live from "../../icons/onlineIcon.png"

const InfoBar = ({room}) => (
    <div className="topBorder">
        <div className="onlineSide">
            <img className="onlineIcon" src={live} alt="Live"/>
            <h3>{room}</h3>
        </div>
        <div className="closeSide">
            <a href="/"><img src={close} alt="Close"/></a>
        </div>
    </div>
)

export default InfoBar