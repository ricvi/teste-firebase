import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {
  Analytic,
  CloudMessaging,
  InAppMessaging,
  RemoteConfig,
} from '../../services/firebase-services';
import NotificationServices from '../../services/push-notification/NotificationService';
import {FIREBASE_LOGO} from '../../assets/images';
import {PRIMARY} from '../../config/colors';

const SplashScreen = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [registerToken, setRegisterToken] = useState('');
  const [isFcmRegistered, setFcmRegistered] = useState(false);

  /** Lifecycle Section */

  // Did Mount
  useEffect(() => {
    console.log('Splash.js did mount');
    InAppMessaging.suppressMessaging(true);
    RemoteConfig.fetchData().then((status) => {
      setLoading(!status);
    });

    const notification = new NotificationServices(onRegister, onNotification);
    CloudMessaging.handleForeground(notification);
    CloudMessaging.handleBackground(notification);

    setTimeout(() => {
      InAppMessaging.suppressMessaging(false);
      navigateToHome();
    }, 5000);
  }, []);

  /** Push Notification Section */

  const onRegister = (token) => {
    setRegisterToken(token);
    setFcmRegistered(true);
  };

  const onNotification = (notif) => {
    // TODO: add on notification press handler
  };

  /** Functional Section */

  const navigateToHome = () => {
    navigation.navigate('Home');
  };

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
