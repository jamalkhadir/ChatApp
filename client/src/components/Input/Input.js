import React from 'react';
import './Input.css';

const Input = ({setMessage, sendMessage, message}) => (
  <form className="inputHandling">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({target:{value}}) => setMessage(value)}
      onKeyPress={eve => eve.key === 'Enter' ? sendMessage(eve) : null}
    />
    <button className="sending" onClick={event => sendMessage(event)}>➤</button>
  </form>
)

export default Input;
