import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Modal, Portal, Text, Button, Divider, ActivityIndicator } from 'react-native-paper';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function UsersModal({ visible, onClose }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const loadUsers = async () => {
      setLoading(true);
      try {
        const q = collection(db, 'users_basic');
        const snap = await getDocs(q);
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setUsers(list);
      } catch (e) {
        console.error('failed to load users', e);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, [visible]);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={styles.modal}
      >
        <Text variant="titleLarge" style={{ fontWeight: 'bold', marginBottom: 8 }}>
          Users Management
        </Text>
        <Divider style={{ marginBottom: 12 }} />

        {loading ? (
          <ActivityIndicator style={{ marginVertical: 24 }} />
        ) : (
          <FlatList
            data={users}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.listRow}>
                <Text variant="bodyMedium" style={{ fontWeight: '600' }}>{item.email}</Text>
                <Text variant="bodySmall" style={{ opacity: 0.6 }}>{item.username}</Text>
              </View>
            )}
            ListEmptyComponent={
              <Text variant="bodyMedium" style={{ opacity: 0.5, textAlign: 'center', paddingVertical: 16 }}>
                No users found
              </Text>
            }
            ItemSeparatorComponent={() => <Divider />}
          />
        )}

        <Button mode="contained" onPress={onClose} style={{ marginTop: 12 }}>
          Close
        </Button>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#FFFBFE',
    margin: 24,
    padding: 20,
    borderRadius: 16,
    maxHeight: '80%',
  },
  listRow: {
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
});
