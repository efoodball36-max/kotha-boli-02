import { useState } from 'react';
import axios from 'axios';

export default function ProfileEditor({ apiBase }) {
  const [avatarUrl, setAvatarUrl] = useState('');

  async function save() {
    await axios.post(`${apiBase}/api/profile/avatar`, { avatarUrl });
    alert('Profile updated');
    setAvatarUrl('');
  }

  return (
    <div style={{ padding: 12 }}>
      <h4>Profile</h4>
      <input placeholder="Avatar URL" value={avatarUrl} onChange={e => setAvatarUrl(e.target.value)} />
      <button onClick={save} style={{ marginLeft: 8 }}>Save</button>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 3aaa7999a940efd5c5b86ed820ed4c00b034c7a4
