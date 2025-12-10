export function useNotifications() {
  function requestPermission() {
    if (!('Notification' in window)) return false;
    if (Notification.permission === 'granted') return true;
    if (Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
    return Notification.permission === 'granted';
  }

  function notify(title, body) {
    if (!('Notification' in window)) return;
    if (Notification.permission === 'granted') {
      new Notification(title, { body });
    }
  }

  return { requestPermission, notify };
}