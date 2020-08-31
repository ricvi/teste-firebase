import {Alert} from 'react-native';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import remoteConfig from '@react-native-firebase/remote-config';
import inAppMessaging from '@react-native-firebase/in-app-messaging';
import messaging from '@react-native-firebase/messaging';

let REMOTE_CONFIG_DATA;

// set the default for remote config here
const REMOTE_CONFIG_KEY = {
  CRASH_ME_BUTTON: 'crash_me_button',
};

function firebaseEventTracking(eventName, eventData) {
  analytics().logEvent(eventName, eventData);
}

function firebaseTriggerCrash() {
  crashlytics().crash();
}

function firebaseRemoteConfigInit() {
  const crashMeButtonDefaultValue = {
    isEnabled: false,
  };

  remoteConfig().setDefaults({
    [REMOTE_CONFIG_KEY.CRASH_ME_BUTTON]: JSON.stringify(
      crashMeButtonDefaultValue,
    ),
  });
}

async function firebaseRemoteConfigFetchData() {
  await firebaseRemoteConfigInit();
  await remoteConfig().fetch(1800);
  await remoteConfig().activate();
  const remoteConfigRawData = await remoteConfig().getAll();

  const data = {};
  Object.keys(remoteConfigRawData).forEach((key) => {
    data[key] = JSON.parse(remoteConfigRawData[key]._value);
  });

  REMOTE_CONFIG_DATA = data;

  return true;
}

function firebaseRemoteConfigGetData(configKey) {
  try {
    return REMOTE_CONFIG_DATA[configKey];
  } catch (error) {
    console.log('error happens when getting remote config data');
  }
}

async function firebaseInAppMessagingSuppress(isSuppress) {
  if (isSuppress) {
    await inAppMessaging().setMessagesDisplaySuppressed(true);
  } else {
    inAppMessaging().setMessagesDisplaySuppressed(false);
  }
}

async function firebaseCloudMessagingGetToken() {
  return await messaging().getToken();
}

function firebaseCloudMessagingForeground(notification) {
  const unsubscribe = messaging().onMessage(async (remoteMessage) => {
    notification.localNotif(remoteMessage);
  });

  return unsubscribe;
}

function firebaseCloudMessagingBackground(notification) {
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    notification.localNotif(remoteMessage);
  });
}

export {
  firebaseEventTracking,
  firebaseTriggerCrash,
  firebaseRemoteConfigFetchData,
  firebaseRemoteConfigGetData,
  firebaseInAppMessagingSuppress,
  firebaseCloudMessagingGetToken,
  firebaseCloudMessagingForeground,
  firebaseCloudMessagingBackground,
};
