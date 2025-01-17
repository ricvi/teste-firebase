import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  Crashlytic,
  Analytic,
  RemoteConfig,
} from '../../services/firebase-services';
import RootNavigation from '../../navigation/RootNavigation';
import {PRIMARY} from '../../config/colors';

const HomeScreen = ({navigation}) => {
  /** Lifecycle Section */

  // Did Mount
  useEffect(() => {
  }, []);

  /** Functional Section */

  // onPress "Tap Me" Button
  const onPressTapMeButton = () => {
    Analytic.logEvent('button_tapped', {buttonName: 'tap me'});
  };

  // onPress "Crash Me" Button
  const onPressCrashMeButton = () => {
    Analytic.logEvent('button_tapped', {buttonName: 'crash me'});
    Crashlytic.triggerCrash();
  };

  // onPress "Go To About" Button
  const onPressGoToSettingButton = () => {
    Analytic.logEvent('button_tapped', {buttonName: 'go to setting'});
    RootNavigation.push('Setting');
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

  const renderGoToSettingButton = () => {
    return (
      <TouchableOpacity
        style={styles.customButton}
        onPress={() => onPressGoToSettingButton()}>
        <Text style={styles.customButtonText}>Go To Setting</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {renderTapMeButton()}
      {renderCrashMeButton()}
      {renderGoToSettingButton()}
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

export default HomeScreen;
