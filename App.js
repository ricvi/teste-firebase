import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {firebaseEventTracking} from './src/services/index';

const App = () => {
  /** Lifecycle Section */

  // Did Mount
  useEffect(() => {
    console.log('hello');
  }, []);

  /** Functional Section */

  // onPress "Tap Me" Button
  const onPressTapMeButton = () => {
    firebaseEventTracking('button_tapped', {buttonName: 'tap me'});
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.customButton}
        onPress={() => onPressTapMeButton()}>
        <Text>Tap Me</Text>
      </TouchableOpacity>
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
    borderColor: 'blue',
    borderWidth: 2,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default App;
