import React, { useEffect, useState } from 'react';
import { Modal, View, Text, Pressable, FlatList } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function UsersModal({ visible, onClose }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!visible) return; // only load when shown
    console.log('UsersModal db...', db);
    const loadUsers = async () => {
      try {
        const q = collection(db, 'users_basic');
        console.log('Query:', q);

        const snap = await getDocs(q);
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setUsers(list);
      } catch (e) {
        console.error('failed to load users', e);
      }
    };

    loadUsers();
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable
        onPress={onClose}
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.35)',
          justifyContent: 'center',
          padding: 16,
        }}
      >
        <Pressable
          onPress={() => {}}
          style={{
            backgroundColor: 'white',
            borderRadius: 12,
            padding: 16,
            gap: 10,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Users Management
          </Text>

          {/* render the list */}
          <FlatList
            data={users}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={{ paddingVertical: 4 }}>
                <Text>
                  {item.email} – {item.username}
                </Text>
              </View>
            )}
            ListEmptyComponent={<Text>No users found</Text>}
          />

          <Pressable
            onPress={onClose}
            style={{
              padding: 12,
              backgroundColor: '#222',
              borderRadius: 8,
              marginTop: 8,
            }}
          >
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: '600',
              }}
            >
              Close
            </Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
