import React, { useState } from 'react';
import { View } from 'react-native';
import Header from '../Header';
import Sidebar from '../Sidebar';
import UserMenu from '../UserMenu';
import UsersModal from '../UsersModal';

// import Header from '../components/Header';
// import Sidebar from '../components/Sidebar';
// import UserMenu from '../components/UserMenu';
// import UsersModal from '../components/UsersModal';

export default function MainLayout({
  title,
  navigation,
  children,
  route,
  username,
}) {
  // accept either a username prop or, if running as a wrapped screen, the route argument
  const name = username ?? route?.params?.username ?? 'Guest';

  console.log('MainLayout render with username:', { name }, { route });

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
        title={title}
        onPressMenu={() => setSidebarOpen(true)}
        onPressUser={() => setUserMenuOpen((v) => !v)}
      />
      <View style={{ flex: 1, padding: 16 }}>{children}</View>
      <UserMenu
        onProfile={() => {
          setUserMenuOpen(false);
          navigation.navigate('Profile', { username: name });
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
          navigation.navigate('Home', { username: name });
        }}
        onProfile={() => {
          setSidebarOpen(false);
          navigation.navigate('Profile', { username: name });
        }}
        onUsersManagement={openUsersManagement}
      />
      <UsersModal
        visible={usersModalOpen}
        onClose={() => setUsersModalOpen(false)}
      />
    </View>
  );
}
