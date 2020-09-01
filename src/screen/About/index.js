import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const AboutScreen = () => {
  /** Lifecycle Section */

  // Did Mount
  useEffect(() => {
    console.log('About.js did mount');
  }, []);

  return (
    <View style={styles.container}>
      <Text>About Screen</Text>
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

export default AboutScreen;
