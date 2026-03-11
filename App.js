import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <View style={styles.container}>
      {/* hides status bar completely */}
      <StatusBar hidden />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // IMPORTANT: no paddingTop here (removes the white gap)
  },
});
