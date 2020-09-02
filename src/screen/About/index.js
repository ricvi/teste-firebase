import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Crashlytic, Event, RemoteConfig} from '../../services/firebase-services';
import {PRIMARY} from '../../config/colors';

const AboutScreen = () => {
  /** Lifecycle Section */

  // Did Mount
  useEffect(() => {
    console.log('About.js did mount');
  }, []);

  /** Functional Section */

  // onPress "Crash Me" Button
  const onPressCrashMeButton = () => {
    Event.logEvent('button_tapped', {buttonName: 'crash me'});
    Crashlytic.triggerCrash();
  };

  /** Render Section */

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

  return (
    <View style={styles.container}>
      {/* <Text>About Screen</Text> */}
      {renderCrashMeButton()}
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
    width: 200,
    padding: 12,
    borderColor: PRIMARY,
    borderWidth: 2,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  customButtonText: {
    color: PRIMARY,
    textAlign: 'center',
  },
});

export default AboutScreen;
