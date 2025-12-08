import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { login, register } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div style={{ maxWidth: 360, margin: '40px auto', padding: 16, border: '1px solid #eee', borderRadius: 8 }}>
      <h2>kotha-boli-02</h2>
      <p>First time: set a unique name and strong password. Later: login anywhere.</p>
      <input placeholder="Unique name" value={username} onChange={e => setUsername(e.target.value)} style={{ width: '100%', marginBottom: 8 }}/>
      <input placeholder="Strong password" type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', marginBottom: 8 }}/>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => register(username, password)}>Register</button>
        <button onClick={() => login(username, password)}>Login</button>
      </div>
    </div>
  );
}
