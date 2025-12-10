import { useNotifications } from '../hooks/useNotifications.js';

export default function NotificationBell() {
  const { requestPermission } = useNotifications();
  return (
    <button onClick={requestPermission} title="Enable notifications">🔔</button>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 3aaa7999a940efd5c5b86ed820ed4c00b034c7a4
