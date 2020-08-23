import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  firebaseEventTracking,
  firebaseTriggerCrash,
  firebaseRemoteConfigFetchData,
  firebaseRemoteConfigGetData,
} from './src/services/index';

const App = () => {
  const [isLoading, setLoading] = useState(true);

  /** Lifecycle Section */

  // Did Mount
  useEffect(() => {
    console.log('App.js did mount');
    firebaseRemoteConfigFetchData().then((status) => {
      setLoading(!status);
    });
  }, []);

  /** Functional Section */

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
