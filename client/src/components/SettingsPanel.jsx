import { useState } from 'react';
import axios from 'axios';

export default function SettingsPanel({ apiBase }) {
  const [groupName, setGroupName] = useState('');
  const [members, setMembers] = useState(''); // comma-separated user IDs

  async function createGroup() {
    const memberIds = members.split(',').map(s => s.trim()).filter(Boolean);
    const res = await axios.post(`${apiBase}/api/rooms`, { name: groupName, memberIds });
    alert(`Group created: ${res.data.name}`);
    setGroupName('');
    setMembers('');
  }

  return (
    <div style={{ padding: 12 }}>
      <h4>Settings</h4>
      <div style={{ marginBottom: 8 }}>
        <input placeholder="Group name" value={groupName} onChange={e => setGroupName(e.target.value)} />
      </div>
      <div style={{ marginBottom: 8 }}>
        <input placeholder="Member IDs (comma-separated)" value={members} onChange={e => setMembers(e.target.value)} />
      </div>
      <button onClick={createGroup}>Create group</button>
    </div>
  );
}