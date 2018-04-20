import { Notifications, Permissions } from 'expo';
import { AsyncStorage } from 'react-native';

const NOTIFICATION_KEY = 'Flashcards:notifications';

export const clearLocalNotification = () => (
  AsyncStorage.removeItem(NOTIFICATION_KEY).then(Notifications.cancelAllScheduledNotificationsAsync)
);

const createNotification = () => ({
  title: 'Complete a quiz!!',
  body: "👋 Don't forget to complete a quiz for today!",
  ios: {
    sound: true,
  },
  android: {
    sound: true,
    vibrate: true,
    sticky: false,
    priority: 'high',
  },
});

export const setLocalNotification = () => (
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync();

              const tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(8);
              tomorrow.setMinutes(0);

              Notifications.scheduleLocalNotificationAsync(createNotification(), { time: tomorrow, repeat: 'day' });
              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            }
          });
      }
    })
);
