// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('user').then((user) => {
      if (user) setUser(JSON.parse(user));
      // if (user) setUser({ user });
    });
  }, []);

  const signIn = async (user) => {
    setUser( user );
    //remove {} to prevent object in the storage 
    // setUser({ user });
    await AsyncStorage.setItem('user', JSON.stringify(user));
    // await AsyncStorage.setItem('user', user);
  };

  const signOut = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
//
