import messaging from '@react-native-firebase/messaging';

function handleForeground(notification) {
  const unsubscribe = messaging().onMessage(async (remoteMessage) => {
    notification.localNotif(remoteMessage);
  });

  return unsubscribe;
}

function handleBackground(notification) {
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    notification.localNotif(remoteMessage);
  });
}

export default {
  handleForeground,
  handleBackground,
};
