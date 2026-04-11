import React from 'react';
import { Appbar } from 'react-native-paper';

export default function Header({ title, onPressMenu, onPressUser, isMenuOpen }) {
  return (
    <Appbar.Header elevated>
      <Appbar.Action
        icon={isMenuOpen ? 'menu-open' : 'menu'}
        onPress={onPressMenu}
      />
      <Appbar.Content title={title} />
      <Appbar.Action icon="account-circle" onPress={onPressUser} />
    </Appbar.Header>
  );
}
