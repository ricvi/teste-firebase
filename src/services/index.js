import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';

function firebaseEventTracking(eventName, eventData) {
  analytics().logEvent(eventName, eventData);
}

function firebaseTriggerCrash() {
  crashlytics().crash();
}

export {firebaseEventTracking, firebaseTriggerCrash};
