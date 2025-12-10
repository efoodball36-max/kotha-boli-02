import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext.jsx';

const SocketContext = createContext();

export function SocketProvider({ children, serverUrl }) {
  const { user } = useAuth();
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (user && !socketRef.current) {
      socketRef.current = io(serverUrl, { auth: { userId: user.id } });
      socketRef.current.on('connect', () => setConnected(true));
      socketRef.current.on('disconnect', () => setConnected(false));
    }
    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [user, serverUrl]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, connected }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
