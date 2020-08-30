import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {
  firebaseEventTracking,
  firebaseTriggerCrash,
  firebaseRemoteConfigFetchData,
  firebaseRemoteConfigGetData,
  firebaseInAppMessagingSuppress,
  firebaseCloudMessagingForeground,
} from './src/services';
import NotificationServices from './src/services/PushNotification/NotificationService';

let notification;

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [registerToken, setRegisterToken] = useState('');
  const [isFcmRegistered, setFcmRegistered] = useState(false);

  /** Lifecycle Section */

  // Did Mount
  useEffect(() => {
    console.log('App.js did mount');
    firebaseInAppMessagingSuppress(true);
    firebaseRemoteConfigFetchData().then((status) => {
      setLoading(!status);
    });
    firebaseCloudMessagingForeground();

    notification = new NotificationServices(onRegister, onNotification);

    setTimeout(() => {
      firebaseInAppMessagingSuppress(false);
    }, 5000);
  }, []);

  /** Push Notification Section */

  const onRegister = (token) => {
    setRegisterToken(token);
    setFcmRegistered(true);
  };

  const onNotification = (notif) => {
    Alert.alert(notif.title, notif.message);
  };

  /** Functional Section */

  // onPress "Test Notification" Button
  const onPressTestNotification = () => {
    notification.localNotif();
    firebaseEventTracking('button_tapped', {buttonName: 'test notification'});
  };

  // onPress "Tap Me" Button
  const onPressTapMeButton = () => {
    firebaseEventTracking('button_tapped', {buttonName: 'tap me'});
  };

  // onPress "Crash Me" Button
  const onPressCrashMeButton = () => {
    firebaseEventTracking('button_tapped', {buttonName: 'crash me'});
    firebaseTriggerCrash();
  };

  /** Render Section */

  const renderTestNotificationButton = () => {
    return (
      <TouchableOpacity
        style={styles.customButton}
        onPress={() => onPressTestNotification()}>
        <Text style={styles.customButtonText}>Test Notification</Text>
      </TouchableOpacity>
    );
  };

  const renderTapMeButton = () => {
    return (
      <TouchableOpacity
        style={styles.customButton}
        onPress={() => onPressTapMeButton()}>
        <Text style={styles.customButtonText}>Tap Me</Text>
      </TouchableOpacity>
    );
  };

  const renderCrashMeButton = () => {
    const {isEnabled} = firebaseRemoteConfigGetData('crash_me_button');
    return isEnabled ? (
      <TouchableOpacity
        style={styles.customButton}
        onPress={() => onPressCrashMeButton()}>
        <Text style={styles.customButtonText}>Crash Me</Text>
      </TouchableOpacity>
    ) : (
      <View />
    );
  };

  const renderLoading = () => {
    return <Text>As If Loading</Text>;
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        renderLoading()
      ) : (
        <>
          {renderTestNotificationButton()}
          {renderTapMeButton()}
          {renderCrashMeButton()}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customButton: {
    padding: 12,
    borderColor: 'green',
    borderWidth: 2,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  customButtonText: {
    color: 'green',
    textAlign: 'center',
  },
});

export default App;
