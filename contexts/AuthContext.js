// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('userEmail').then((email) => {
      if (email) setUser({ email });
    });
  }, []);

  const signIn = async (email) => {
    setUser({ email });
    await AsyncStorage.setItem('userEmail', email);
  };

  const signOut = async () => {
    setUser(null);
    await AsyncStorage.removeItem('userEmail');
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
//
