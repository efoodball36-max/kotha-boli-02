import { formatTime } from '../utils/time.js';

export default function MessageItem({ message, onReact }) {
  const senderName = message.sender?.username || 'Unknown';
  const time = formatTime(message.sentAt);

  return (
    <div style={{ margin: '8px 0' }}>
      <div style={{ fontSize: 12, color: '#888' }}>
        {senderName} • {time}
      </div>
      {message.text && <div style={{ padding: '8px 12px', background: '#f9f9f9', borderRadius: 8 }}>{message.text}</div>}
      {message.imageUrl && <img src={message.imageUrl} alt="" style={{ maxWidth: '100%', borderRadius: 8, marginTop: 6 }}/>}
      <div style={{ marginTop: 6, display: 'flex', gap: 8 }}>
        {['👍','❤️','🤔','🥺','🤣'].map(e => (
          <button key={e} onClick={() => onReact(message._id, e)} style={{ border: '1px solid #ddd', borderRadius: 6, padding: '2px 6px' }}>
            {e}
          </button>
        ))}
      </div>
      {message.reactions?.length > 0 && (
        <div style={{ marginTop: 4, fontSize: 12, color: '#555' }}>
          Reactions: {message.reactions.map(r => r.emoji).join(' ')}
        </div>
      )}
    </div>
  );
}
