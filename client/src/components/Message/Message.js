import React from 'react';
import './Message.css';

const Message = ({message: {text, user}, display}) => {
    let sentByCurr = false
    const trimmedDisplay = display.trim().toLowerCase()
    if(user === trimmedDisplay){
        sentByCurr = true
    }
    return (
        sentByCurr 
        ? (
            <div className="messageWrapper justifyEnd">
                <p className="sentText selfPadding">{trimmedDisplay}</p>
                <div className="textBubble selfColor">
                    <p className="text selfText">{text}</p>
                </div>
            </div>) 
        : (
            <div className="messageWrapper justifyStart">
                <div className="textBubble otherColor">
                    <p className="text otherText">{text}</p>
                </div>
                <p className="sentText otherPadding">{user}</p>
            </div>
        )
    )
}


export default Message;
