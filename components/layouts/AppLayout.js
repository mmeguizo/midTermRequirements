import React, { useState } from 'react';
import { View } from 'react-native';
import Header from '../Header';
import Sidebar from '../Sidebar';
import UserMenu from '../UserMenu';
import UsersModal from '../UsersModal';
import UsersScreen from '../../screens/UsersScreen';



export default function MainLayout({
  title,
  navigation,
  children,
  route,
  name,
}) {
  // accept either a username prop or, if running as a wrapped screen, the route argument
  const names = name ?? route?.params?.name ?? 'Guest';

  console.log('MainLayout render with name:', { names }, { route });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [usersModalOpen, setUsersModalOpen] = useState(false);
  const [usersScreenOpen, setUsersScreenOpen] = useState(false);

  const openUsersManagementModal = () => {
    setSidebarOpen(false);
    setUsersModalOpen(true);
  };

  const openUsersManagement = () => {
    setSidebarOpen(false);
    setUsersScreenOpen(true);
  };

  const logout = () => {
    setUserMenuOpen(false);
    navigation.replace('Login');
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={title}
        onPressMenu={() => setSidebarOpen(true)}
        onPressUser={() => setUserMenuOpen((v) => !v)}
      />
      <View style={{ flex: 1, padding: 16 }}>{children}</View>
      <UserMenu
        onProfile={() => {
          setUserMenuOpen(false);
          navigation.navigate('Profile', { name: name });
        }}
        onLogout={logout}
        visible={userMenuOpen}
        onClose={() => setUserMenuOpen(false)}
      />
      <Sidebar
        visible={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onHome={() => {
          setSidebarOpen(false);
          navigation.navigate('Home', { name: name });
        }}
        onProfile={() => {
          setSidebarOpen(false);
          navigation.navigate('Profile', { name: name });
        }}
        onUsersManagement={() => {
          setSidebarOpen(false);
          navigation.navigate('Users', { name: name });
        }}
        onUsersManagementModal={openUsersManagementModal}
      />
      <UsersModal
        visible={usersModalOpen}
        onClose={() => setUsersModalOpen(false)}
      />
     
    
    </View>
  );
}
