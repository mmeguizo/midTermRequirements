import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Avatar } from 'react-native-paper';

import MainLayout from '../components/layouts/AppLayout';

export default function ProfileScreen({ navigation, route }) {
  const name = route?.params?.name || 'Guest';

  return (
    <MainLayout title="Profile" navigation={navigation} name={name}>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Title
            title={name}
            subtitle="User Profile"
            left={(props) => <Avatar.Icon {...props} icon="account" />}
          />
          <Card.Content style={styles.content}>
            <View style={styles.row}>
              <Text variant="labelLarge" style={styles.label}>Email</Text>
              <Text variant="bodyLarge">{name}@sample.com</Text>
            </View>
            <View style={styles.row}>
              <Text variant="labelLarge" style={styles.label}>Role</Text>
              <Text variant="bodyLarge">Student (placeholder)</Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  card: {
    borderRadius: 16,
  },
  content: {
    gap: 12,
    paddingTop: 8,
  },
  row: {
    gap: 2,
  },
  label: {
    opacity: 0.6,
  },
});
