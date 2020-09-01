import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Crashlytic, Event, RemoteConfig} from '../../services/firebase';

const HomeScreen = ({navigation}) => {
  /** Lifecycle Section */

  // Did Mount
  useEffect(() => {
    console.log('Home.js did mount');
  }, []);

  /** Functional Section */

  // onPress "Tap Me" Button
  const onPressTapMeButton = () => {
    Event.logEvent('button_tapped', {buttonName: 'tap me'});
  };

  // onPress "Crash Me" Button
  const onPressCrashMeButton = () => {
    Event.logEvent('button_tapped', {buttonName: 'crash me'});
    Crashlytic.triggerCrash();
  };

  // onPress "Go To About" Button
  const onPressGoToAboutButton = () => {
    Event.logEvent('button_tapped', {buttonName: 'go to about'});
    navigation.navigate('About');
  };

  /** Render Section */

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
    const {isEnabled} = RemoteConfig.getData('crash_me_button');
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

  const renderGoToAboutButton = () => {
    return (
      <TouchableOpacity
        style={styles.customButton}
        onPress={() => onPressGoToAboutButton()}>
        <Text style={styles.customButtonText}>Go To About</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {renderTapMeButton()}
      {renderCrashMeButton()}
      {renderGoToAboutButton()}
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

export default HomeScreen;
