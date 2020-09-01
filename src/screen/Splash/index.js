import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {
  CloudMessaging,
  InAppMessaging,
  RemoteConfig,
} from '../../services/firebase';
import NotificationServices from '../../services/push-notification/NotificationService';
import {FIREBASE_LOGO} from '../../assets/images';

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
      navigation.navigate('Home');
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
    backgroundColor: 'black',
  },
});

export default SplashScreen;
