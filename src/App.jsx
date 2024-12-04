import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('message', message);
      setMessage('');
    }
  };

  return (
    <div className="App">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            {msg}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
