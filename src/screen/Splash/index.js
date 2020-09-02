import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {
  Analytic,
  CloudMessaging,
  InAppMessaging,
  RemoteConfig,
} from '../../services/firebase-services';
import RootNavigation from '../../navigation/RootNavigation';
import NotificationServices from '../../services/push-notification/NotificationService';
import {FIREBASE_LOGO} from '../../assets/images';
import {PRIMARY} from '../../config/colors';

const SplashScreen = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [registerToken, setRegisterToken] = useState('');
  const [isFcmRegistered, setFcmRegistered] = useState(false);
  const [isInitializeFinish, setInitializeFinish] = useState(false);

  /** Lifecycle Section */

  // Did Mount
  useEffect(() => {
    console.log('Splash.js did mount');
    Analytic.logScreen('Splash');
    InAppMessaging.suppressMessaging(true);
    RemoteConfig.fetchData().then((status) => {
      setLoading(!status);
    });

    const notification = new NotificationServices(onRegister, onNotification);
    CloudMessaging.handleForeground(notification);
    CloudMessaging.handleBackground(notification);

    setTimeout(() => {
      InAppMessaging.suppressMessaging(false);
      setInitializeFinish(true);
    }, 5000);
  }, []);

  // Did Update

  useEffect(() => {
    if (isInitializeFinish) {
      RootNavigation.reset('Home');
    }
  });

  /** Push Notification Section */

  const onRegister = (token) => {
    setRegisterToken(token);
    setFcmRegistered(true);
  };

  const onNotification = (notif) => {
    // TODO: add on notification press handler
  };

  /** Functional Section */

  /** Render Section */

  const renderLoading = () => {
    return <Image source={FIREBASE_LOGO} />;
  };

  return <View style={styles.container}>{renderLoading()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PRIMARY,
  },
});

export default SplashScreen;
