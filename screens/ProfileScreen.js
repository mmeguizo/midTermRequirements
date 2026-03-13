import React, { useState } from 'react';
import { View, Text } from 'react-native';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import UserMenu from '../components/UserMenu';
import UsersModal from '../components/UsersModal';
import MainLayout from '../components/layouts/AppLayout';

export default function ProfileScreen({ navigation, route }) {
  const username = route?.params?.username || 'Guest';

  return (
    <MainLayout title="Profile" navigation={navigation} username={username}>
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
    </MainLayout>
  );
}

/*
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
*/
