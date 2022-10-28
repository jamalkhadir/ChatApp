import React from "react"
import {useState} from "react"
import {useEffect} from "react"
import io from "socket.io-client"
import queryString from "query-string"
import "./Chat.css"
import InfoBar from "../InfoBar/InfoBar"
import Input from "../Input/Input"
import Messages from "../Messages/Messages"
let socket;

const Chat = ({location}) => {
    const [room, setRoom] = useState("")
    const [display, setDisplay] = useState("")
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const ENDHOST = "https://jamalkhadir-chatapp.herokuapp.com"

    useEffect(() => {
        const {display, room} = queryString.parse(location.search)
        socket = io(ENDHOST)
        setDisplay(display)
        setRoom(room)

        socket.emit("join", {display, room}, () => {

        })
        return () => {
            socket.emit("disconnect")
            socket.off()
        }
    }, [ENDHOST, location.search])
    useEffect(() => {
        socket.on("message", (message) => {
            setMessages([...messages, message])
        })
    }, [messages])

    const sendMessage = (event) => {
        event.preventDefault()
        if(message){
            socket.emit("sendMessage", message, () => setMessage(""))
        }
    }

    console.log(message, messages)

    return(
        <div className="chatWrapper">
            <div className="innerWrapper">
                <InfoBar room={room}/>
                <Messages messages={messages} display={display}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
        </div>
    )
}

export default Chat