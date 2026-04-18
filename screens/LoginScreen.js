import React, { useState, useEffect, useContext } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { View, Alert, Platform } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import LoginLayout from '../components/layouts/LoginLayout';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithCredential, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { AuthContext } from '../contexts/AuthContext';

GoogleSignin.configure({
  // You MUST provide your Web Client ID here, even if you are building for iOS/Android
  // This is what Firebase uses to generate the credential.
  // webClientId: '77629757222-q1sr4r45efiqt4ate8s5s0eqev8ptpvh.apps.googleusercontent.com', 
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
});

export default function LoginScreen({ navigation }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');


  // --- Google Native Login ---
  // const handleGoogleLogin = async () => {
  //   try {
  //     // Check if your device supports Google Play (Android specific check)
  //     await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

  //     // Get the user's ID token from Google natively
  //     const { idToken } = await GoogleSignin.signIn();

  //     // Create a Firebase credential with the Google token
  //     const googleCredential = GoogleAuthProvider.credential(idToken);

  //     // Sign-in the user with the credential
  //     const { user: firebaseUser } = await signInWithCredential(auth, googleCredential);

  //     console.log('Firebase auth google success:', { firebaseUser });
  //     signIn(firebaseUser.email);
  //     navigation.replace('Home');

  //   } catch (error) {
  //     console.log('Google sign-in error:', error);
  //     Alert.alert('Google Authentication failed', error.message);
  //   }
  // };

  const handleGoogleLogin = async () => {
    // 🌐 IF WE ARE ON THE WEB (Testing in Chrome/Edge)
    if (Platform.OS === 'web') {
      try {
        const provider = new GoogleAuthProvider();
        // This triggers the standard web browser popup!
        const result = await signInWithPopup(auth, provider);

        console.log('Web Google auth success:', result.user);
        // signIn(result.user.email);
        signIn({
          uid: result.user.uid,
          email: result.user.email,
          name: result.user.displayName,
        });
        navigation.replace('Home');
      } catch (error) {
        console.log('Web Google sign-in error:', error);
        window.alert(`Google Auth failed: ${error.message}`);
      }
      return; // Stop here so it doesn't run the mobile code below
    }

    // 📱 IF WE ARE ON A PHONE (Android/iOS)
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = GoogleAuthProvider.credential(idToken);
      const { user: firebaseUser } = await signInWithCredential(auth, googleCredential);

      console.log('Mobile Google auth success:', { firebaseUser });
      // signIn(firebaseUser.email);
      signIn({
        uid: result.user.uid,
        email: result.user.email,
        name: result.user.displayName,
      });
      navigation.replace('Home');

    } catch (error) {
      console.log('Mobile Google sign-in error:', error);
      Alert.alert('Google Authentication failed', error.message);
    }
  };

  const { signIn } = useContext(AuthContext);
  const handleLogin = () => {
    
    if (!user.trim() || !pass.trim()) {
      Alert.alert('Oops', 'Please fill in all fields');
      return;
    }

    // if (user === 'admin' && pass === '1234') {
    //   navigation.replace('Home', { username: user });
    // } else {
    //   Alert.alert('Invalid', 'Wrong username/password');
    // }

    signInWithEmailAndPassword(auth, user, pass)
      .then(({ user: firebaseUser }) => {
        // firebaseUser.uid, .email, etc. are available
        console.log('Firebase auth success:', { firebaseUser });
        // signIn(firebaseUser.email); // update context with the email of the logged-in user
        signIn({
          uid: firebaseUser.uid ?? 1,
          email: firebaseUser.email,
          name: firebaseUser.email.split('@')[0],
        });
        //  navigation.replace('Home', {user firebase.email});
          navigation.replace('Home');
      })
      .catch((err) => {
        console.log('Firebase auth error:', err.message);
        Alert.alert('Authentication failed', err.message);
        window.alert('Authentication failed', err.message);
      });
  };

  return (
    <LoginLayout>
      <TextInput
        label="Email"
        value={user}
        keyboardType="email-address"
        onChangeText={setUser}
        mode="outlined"
        left={<TextInput.Icon icon="email" />}
        autoCapitalize="none"
      />

      <TextInput
        label="Password"
        value={pass}
        onChangeText={setPass}
        secureTextEntry
        mode="outlined"
        left={<TextInput.Icon icon="lock" />}
      />

      <Button mode="contained" onPress={handleLogin} icon="login" style={{ marginTop: 4 }}>
        Sign in
      </Button>
      <Button mode="outlined" onPress={handleGoogleLogin} icon="google">
        Sign with Google
      </Button>
      <Text variant="bodySmall" style={{ opacity: 0.6, textAlign: 'center' }}>
        Try: testers@testers.com / testers
      </Text>
    </LoginLayout>
  );
}

/*
import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import AppButton from '../components/AppButton';

export default function LoginScreen({ navigation }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = () => {
    if (!user.trim() || !pass.trim()) {
      Alert.alert('Oops', 'Please fill in all fields');
      return;
    }

    if (user === 'admin' && pass === '1234') {
      navigation.replace('Home', { username: user });
    } else {
      Alert.alert('Invalid', 'Wrong username/password');
    }
  };

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: 'center', gap: 12 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Login</Text>

      <TextInput
        placeholder="Username"
        value={user}
        onChangeText={setUser}
        style={{ borderWidth: 1, borderRadius: 8, padding: 10 }}
      />

      <TextInput
        placeholder="Password"
        value={pass}
        onChangeText={setPass}
        secureTextEntry
        style={{ borderWidth: 1, borderRadius: 8, padding: 10 }}
      />

      <AppButton title="Sign in" onPress={handleLogin} />
      <Text style={{ opacity: 0.6 }}>Try: admin / 1234</Text>
    </View>
  );
}

*/
