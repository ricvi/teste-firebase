import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SettingScreen = () => {
  /** Lifecycle Section */

  // Did Mount
  useEffect(() => {
    console.log('Setting.js did mount');
  }, []);

  return (
    <View style={styles.container}>
      <Text>Setting Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SettingScreen;
