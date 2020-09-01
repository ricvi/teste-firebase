import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ProfileScreen = () => {
  /** Lifecycle Section */

  // Did Mount
  useEffect(() => {
    console.log('Profile.js did mount');
  }, []);

  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
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

export default ProfileScreen;
