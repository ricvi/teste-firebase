import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  firebaseEventTracking,
  firebaseTriggerCrash,
} from './src/services/index';

const App = () => {
  /** Lifecycle Section */

  // Did Mount
  useEffect(() => {
    console.log('App.js Did Mount');
  }, []);

  /** Functional Section */

  // onPress "Tap Me" Button
  const onPressTapMeButton = () => {
    firebaseEventTracking('button_tapped', {buttonName: 'tap me'});
  };

  // onPress "Crash Me" Button
  const onPressCrashMeButton = () => {
    firebaseTriggerCrash();
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
    return (
      <TouchableOpacity
        style={styles.customButton}
        onPress={() => onPressCrashMeButton()}>
        <Text style={styles.customButtonText}>Crash Me</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {renderTapMeButton()}
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
    width: 100,
    padding: 12,
    borderColor: 'green',
    borderWidth: 2,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  customButtonText: {
    color: 'green',
  },
});

export default App;
