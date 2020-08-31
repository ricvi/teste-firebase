import inAppMessaging from '@react-native-firebase/in-app-messaging';

async function suppressMessaging(isSuppress) {
  if (isSuppress) {
    await inAppMessaging().setMessagesDisplaySuppressed(true);
  } else {
    inAppMessaging().setMessagesDisplaySuppressed(false);
  }
}

export default {suppressMessaging};
