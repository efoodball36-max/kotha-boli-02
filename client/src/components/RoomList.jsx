import { useEffect, useState } from 'react';
import axios from 'axios';

export default function RoomList({ apiBase, onSelect }) {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get(`${apiBase}/api/rooms`).then(res => setRooms(res.data));
  }, [apiBase]);

  return (
    <div style={{ borderRight: '1px solid #eee', width: 300, overflowY: 'auto' }}>
      <div style={{ padding: 12, fontWeight: 700 }}>Rooms</div>
      {rooms.map(r => (
        <div key={r._id} onClick={() => onSelect(r)} style={{ padding: 12, cursor: 'pointer' }}>
          {r.isGroup ? '👥' : '💬'} {r.name}
        </div>
      ))}
    </div>
  );
}
