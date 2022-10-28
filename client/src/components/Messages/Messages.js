import React from 'react';
import './Messages.css';
import Message from '../Message/Message';
import Scroller from "react-scroll-to-bottom"

const Messages = ({messages, display}) => (
    <Scroller className="messages">
        {messages.map((message, i) => <div key={i}><Message message={message} display={display}/></div>)}
    </Scroller>
)

export default Messages;
