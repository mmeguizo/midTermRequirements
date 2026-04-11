import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Drawer, Text, Divider } from 'react-native-paper';

export default function Sidebar({
  visible,
  onClose,
  onHome,
  onProfile,
  onUsersManagementModal,
  onUsersManagement,
}) {
  if (!visible) return null;

  return (
    <Pressable
      onPress={onClose}
      style={styles.overlay}
    >
      {/* stop closing when clicking inside panel */}
      <Pressable
        onPress={() => {}}
        style={styles.panel}
      >
        <Text variant="titleMedium" style={styles.menuTitle}>Menu</Text>
        <Divider style={{ marginBottom: 4 }} />

        <Drawer.Item
          icon="home"
          label="Home"
          onPress={onHome}
        />
        <Drawer.Item
          icon="account"
          label="Profile Screen"
          onPress={onProfile}
        />
        <Drawer.Item
          icon="account-group"
          label="Users Management (Modal)"
          onPress={onUsersManagementModal}
        />
        <Drawer.Item
          icon="account-cog"
          label="Users CRUD (Screen)"
          onPress={onUsersManagement}
        />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 64,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  panel: {
    width: 260,
    height: '100%',
    backgroundColor: '#FFFBFE',
    paddingTop: 12,
    elevation: 4,
  },
  menuTitle: {
    fontWeight: '700',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
});
