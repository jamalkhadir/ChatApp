import React from "react"
import {useState} from "react"
import {Link} from "react-router-dom"
import "./Join.css"

const Join = () => {
    const [room, setRoom] = useState("")
    const [display, setDisplay] = useState("")
    return(
        <div className="backgroundWrapper">
            <div className="moduleWrapper">
                <h1 className="header">Live Chat</h1>
                <div><input placeholder="Display Name" className="initFields" type="text" onChange={(event)=>setDisplay(event.target.value)} /></div>
                <div><input placeholder="Room" className="initFields margin" type="text" onChange={(event)=>setRoom(event.target.value)} /></div>
                <Link onClick={event => (!display || !room) ? event.preventDefault() : null} to={`/chat?display=${display}&room=${room}`}>
                    <button className="joinButton margin" type="submit">JOIN</button>
                </Link>
            </div>
        </div>
    )
}

export default Join