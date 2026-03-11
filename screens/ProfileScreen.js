import React, { useState } from 'react';
import { View, Text } from 'react-native';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import UserMenu from '../components/UserMenu';
import UsersModal from '../components/UsersModal';

export default function ProfileScreen({ navigation, route }) {
  const username = route?.params?.username || 'Guest';

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [usersModalOpen, setUsersModalOpen] = useState(false);

  const openUsersManagement = () => {
    setSidebarOpen(false);
    setUsersModalOpen(true);
  };

  const logout = () => {
    setUserMenuOpen(false);
    navigation.replace('Login');
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Profile"
        onPressMenu={() => setSidebarOpen(true)}
        onPressUser={() => setUserMenuOpen((v) => !v)}
      />
      <View style={{ padding: 16, gap: 10 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
          Profile of {username}
        </Text>
        <Text>This screen follows the same layout style as Home.</Text>

        <View style={{ borderWidth: 1, borderRadius: 10, padding: 12 }}>
          <Text style={{ fontWeight: '600' }}>Profile Details</Text>
          <Text style={{ opacity: 0.8 }}>Email: {username}@sample.com</Text>
          <Text style={{ opacity: 0.8 }}>Role: Student (placeholder)</Text>
        </View>
      </View>
      <UserMenu
        visible={userMenuOpen}
        onClose={() => setUserMenuOpen(false)}
        onProfile={() => setUserMenuOpen(false)} // already on profile
        onLogout={logout}
      />

      <Sidebar
        visible={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onHome={() => {
          setSidebarOpen(false);
          navigation.navigate('Home', { username });
        }}
        onProfile={() => setSidebarOpen(false)}
        onUsersManagement={openUsersManagement}
      />

      <UsersModal
        visible={usersModalOpen}
        onClose={() => setUsersModalOpen(false)}
      />
    </View>
  );
}
