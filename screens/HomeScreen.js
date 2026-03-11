import React, { useState } from 'react';
import { View, Text } from 'react-native';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import UserMenu from '../components/UserMenu';
import UsersModal from '../components/UsersModal';
import MainLayout from '../components/layouts/AppLayout';

export default function HomeScreen({ navigation, route }) {
  const username = route?.params?.username || 'Guest';
  console.log('HomeScreen render with username:', { username }, { route });

  return (
    <MainLayout title="Home" navigation={navigation} username={username}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
        Welcome, {username}!
      </Text>
      <Text>This is the Home screen layout...</Text>
    </MainLayout>
  );
}

/*
   <View style={{ flex: 1 }}>
      <Header
        title="Home"
        onPressMenu={() => setSidebarOpen(true)}
        onPressUser={() => setUserMenuOpen((v) => !v)}
      />
      <View style={{ padding: 16, gap: 10 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
          Welcome, {username}!
        </Text>
        <Text>This is the Home screen layout.</Text>

        <View style={{ borderWidth: 1, borderRadius: 10, padding: 12 }}>
          <Text style={{ fontWeight: '600' }}>Card Example</Text>
          <Text style={{ opacity: 0.8 }}>
            You can place lists, dashboards, etc. here.
          </Text>
        </View>
      </View>
      <UserMenu
        visible={userMenuOpen}
        onClose={() => setUserMenuOpen(false)}
        onProfile={() => {
          setUserMenuOpen(false);
          navigation.navigate('Profile', { username });
        }}
        onLogout={logout}
      />

      <Sidebar
        visible={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onHome={() => setSidebarOpen(false)}
        onProfile={() => {
          setSidebarOpen(false);
          navigation.navigate('Profile', { username });
        }}
        onUsersManagement={openUsersManagement}
      />

      <UsersModal
        visible={usersModalOpen}
        onClose={() => setUsersModalOpen(false)}
      />
    </View>

*/
