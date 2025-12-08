export default function UserBadge({ username, avatarUrl, online }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ position: 'relative' }}>
        <img src={avatarUrl || 'https://via.placeholder.com/40'} alt="" width="40" height="40" style={{ borderRadius: '50%' }}/>
        <span
          title={online ? 'Online' : 'Offline'}
          style={{
            position: 'absolute',
            bottom: 0, right: 0,
            width: 10, height: 10,
            borderRadius: '50%',
            background: online ? 'green' : 'white',
            border: '1px solid #ccc'
          }}
        />
      </div>
      <span style={{ fontWeight: 600 }}>{username}</span>
    </div>
  );
}
