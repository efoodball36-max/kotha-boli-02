import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { SocketProvider } from './context/SocketContext.jsx';

const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:8080';
const serverUrl = apiBase; // same origin for Socket.IO

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider apiBase={apiBase}>
      <SocketProvider serverUrl={serverUrl}>
        <App apiBase={apiBase} />
      </SocketProvider>
    </AuthProvider>
  </React.StrictMode>
);
