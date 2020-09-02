import analytics from '@react-native-firebase/analytics';

function logEvent(eventName, eventData) {
  analytics().logEvent(eventName, eventData);
}

function logScreen(screenName, overrideScreen) {
  if (overrideScreen) {
    analytics().setCurrentScreen(screenName, overrideScreen);
  } else {
    analytics().setCurrentScreen(screenName, screenName);
  }
}

export default {logEvent, logScreen};
