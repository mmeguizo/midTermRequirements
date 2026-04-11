import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Avatar } from 'react-native-paper';
import { collection, getCountFromServer } from 'firebase/firestore';
import { db } from '../firebaseConfig';

import MainLayout from '../components/layouts/AppLayout';
import { AuthContext } from '../contexts/AuthContext';

export default function HomeScreen({ navigation, route }) {
  const { user } = useContext(AuthContext);
  const [userCount, setUserCount] = useState(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const coll = collection(db, 'users_basic');
        const snapshot = await getCountFromServer(coll);
        setUserCount(snapshot.data().count);
      } catch (e) {
        console.error('Failed to fetch user count', e);
      }
    };
    fetchCount();
  }, []);

  return (
    <MainLayout title="Home" navigation={navigation} name={user?.name}>
      <View style={styles.container}>
        <Text variant="headlineSmall" style={{ fontWeight: 'bold' }}>
          Welcome, {user?.name}!
        </Text>

        {/* Stat card — total users */}
        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <Avatar.Icon size={48} icon="account-group" style={styles.statIcon} />
            <View>
              <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>
                {userCount === null ? '—' : userCount}
              </Text>
              <Text variant="bodySmall" style={{ opacity: 0.6 }}>Total Users</Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Title
            title="Dashboard"
            subtitle="Overview"
            left={(props) => <Avatar.Icon {...props} icon="view-dashboard" />}
          />
          <Card.Content>
            <Text variant="bodyMedium" style={{ opacity: 0.7 }}>
              You can place lists, dashboards, charts, etc. here.
            </Text>
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
  statCard: {
    borderRadius: 16,
  },
  statContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  statIcon: {
    backgroundColor: '#E8DEF8',
  },
  card: {
    borderRadius: 16,
  },
});
