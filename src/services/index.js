import analytics from '@react-native-firebase/analytics';

function firebaseEventTracking(eventName, eventData) {
  analytics().logEvent(eventName, eventData);
}

export {firebaseEventTracking};
