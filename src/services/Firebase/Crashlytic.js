import crashlytics from '@react-native-firebase/crashlytics';

function triggerCrash() {
  crashlytics().crash();
}

export default {triggerCrash};
