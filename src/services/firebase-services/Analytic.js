import analytics from '@react-native-firebase/analytics';

function logEvent(eventName, eventData) {
  analytics().logEvent(eventName, eventData);
}

export default {logEvent};
