import { useNotifications } from '../hooks/useNotifications.js';

export default function NotificationBell() {
  const { requestPermission } = useNotifications();
  return (
    <button onClick={requestPermission} title="Enable notifications">🔔</button>
  );
}