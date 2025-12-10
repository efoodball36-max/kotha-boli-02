import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useSocket } from '../context/SocketContext.jsx';
import MessageItem from './MessageItem.jsx';
import ImageUploader from './ImageUploader.jsx';
import { useNotifications } from '../hooks/useNotifications.js';

export default function ChatWindow({ apiBase, room }) {
  const { socket } = useSocket();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const bottomRef = useRef(null);
  const { notify } = useNotifications();

  useEffect(() => {
    if (!room) return;
    axios.get(`${apiBase}/api/messages/${room._id}`).then(res => setMessages(res.data));
  }, [apiBase, room]);

  useEffect(() => {
    if (!socket || !room) return;
    socket.emit('room:join', room._id);

    const onNew = (msg) => {
      setMessages(prev => [...prev, msg]);
      notify('New message', `${msg.sender.username}: ${msg.text || 'Image'}`);
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    const onReactUpdate = ({ messageId, reactions }) => {
      setMessages(prev => prev.map(m => m._id === messageId ? { ...m, reactions } : m));
    };

    socket.on('message:new', onNew);
    socket.on('message:react:update', onReactUpdate);

    return () => {
      socket.off('message:new', onNew);
      socket.off('message:react:update', onReactUpdate);
    };
  }, [socket, room, notify]);

  async function sendMessage(imageUrl) {
    socket.emit('message:send', { roomId: room._id, text, imageUrl });
    setText('');
  }

  function onUploaded(url) {
    sendMessage(url);
  }

  function onReact(messageId, emoji) {
    socket.emit('message:react', { messageId, emoji });
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, padding: 12, overflowY: 'auto' }}>
        {messages.map(m => <MessageItem key={m._id} message={m} onReact={onReact} />)}
        <div ref={bottomRef} />
      </div>
      <div style={{ display: 'flex', gap: 8, padding: 12, borderTop: '1px solid #eee' }}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1 }}
        />
        <ImageUploader apiBase={apiBase} onUploaded={onUploaded} />
        <button onClick={() => sendMessage('')}>Send</button>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 3aaa7999a940efd5c5b86ed820ed4c00b034c7a4
