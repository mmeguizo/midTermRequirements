import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import AppButton from '../components/AppButton';
import LoginLayout from '../components/layouts/LoginLayout';

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
    <LoginLayout>
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
