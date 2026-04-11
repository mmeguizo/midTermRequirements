import React from 'react';
import { Menu, Divider } from 'react-native-paper';

export default function UserMenu({ visible, onClose, onProfile, onLogout }) {
  return (
    <Menu
      visible={visible}
      onDismiss={onClose}
      anchor={{ x: 9999, y: 64 }}
      anchorPosition="bottom"
    >
      <Menu.Item leadingIcon="account" onPress={onProfile} title="Profile" />
      <Divider />
      <Menu.Item
        leadingIcon="logout"
        onPress={onLogout}
        title="Logout"
        titleStyle={{ color: '#B3261E' }}
      />
    </Menu>
  );
}
