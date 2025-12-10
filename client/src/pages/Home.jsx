import { useEffect, useState } from 'react';
import axios from 'axios';
import RoomList from '../components/RoomList.jsx';
import ChatWindow from '../components/ChatWindow.jsx';
import UserBadge from '../components/UserBadge.jsx';
import SettingsPanel from '../components/SettingsPanel.jsx';
import ProfileEditor from '../components/ProfileEditor.jsx';
import NotificationBell from '../components/NotificationBell.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Home({ apiBase }) {
  const { user } = useAuth();
  const [me, setMe] = useState(null);
  const [room, setRoom] = useState(null);

  useEffect(() => {
    axios.get(`${apiBase}/api/profile/me`).then(res => setMe(res.data));
  }, [apiBase]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <RoomList apiBase={apiBase} onSelect={setRoom} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: 8, borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <UserBadge username={me?.username || user?.username} avatarUrl={me?.avatarUrl} online={true} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <NotificationBell />
          </div>
        </div>
        {room ? <ChatWindow apiBase={apiBase} room={room} /> : <div style={{ padding: 12 }}>Select a room to start chatting.</div>}
        <div style={{ display: 'flex', borderTop: '1px solid #eee' }}>
          <SettingsPanel apiBase={apiBase} />
          <ProfileEditor apiBase={apiBase} />
        </div>
      </div>
    </div>
  );
}