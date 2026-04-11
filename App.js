import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme  } from '@react-navigation/native';
import { AuthProvider } from './contexts/AuthContext';
import AppNavigator from './navigation/AppNavigator';
import {
  PaperProvider,
  MD3LightTheme,
  adaptNavigationTheme,
} from 'react-native-paper';

const appTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6200EE',
    onPrimary: '#FFFFFF',
    primaryContainer: '#E8DEF8',
    onPrimaryContainer: '#21005D',
    secondary: '#625B71',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#E8DEF8',
    surface: '#FFFBFE',
    onSurface: '#1C1B1F',
    surfaceVariant: '#E7E0EC',
    onSurfaceVariant: '#49454F',
    error: '#B3261E',
    onError: '#FFFFFF',
    outline: '#79747E',
    elevation: {
      ...MD3LightTheme.colors.elevation,
      level2: '#F3EDF7',
    },
  },
};

const { LightTheme } = adaptNavigationTheme({
  reactNavigationLight: DefaultTheme,
});

export default function App() {
  return (
    <PaperProvider theme={appTheme}>
    <View style={styles.container}>
      {/* hides status bar completely */}
      <StatusBar hidden />
      <NavigationContainer>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </NavigationContainer>
    </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // IMPORTANT: no paddingTop here (removes the white gap)
  },
});
