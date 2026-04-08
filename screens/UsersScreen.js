import React, { useState, useContext } from 'react';
import MainLayout from '../components/layouts/AppLayout';
import { AuthContext } from '../contexts/AuthContext';
import { DataTable, ActivityIndicator, MD2Colors, Button, IconButton } from 'react-native-paper';
import { View, Text, Alert } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
export default function UsersScreen({ navigation }) {

    const { user } = useContext(AuthContext);
    console.log('HomeScreen render with user:', user);
    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(
        numberOfItemsPerPageList[0]
    );

    const [users, setUsers] = React.useState([]);
    //loading animation
    const [loading, setLoading] = useState(true);

    const handleAddUser = () => {
        Alert.alert('Add user', 'Add user action triggered.');
    };

    const handleEditUser = (user) => {
        Alert.alert('Edit user', `Edit ${user.email}`);
    };

    const handleDeleteUser = (user) => {
        Alert.alert(
            'Delete user',
            `Delete ${user.email}?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => setUsers((prev) => prev.filter((u) => u.id !== user.id)),
                },
            ]
        );
    };

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, users.length);

    React.useEffect(() => {
        setLoading(true);
        try {
            const getUsers = async () => {
                const usersCol = collection(db, 'users_basic');
                const usersSnapshot = await getDocs(usersCol);
                console.log('Fetched users from Firestore:', usersSnapshot.docs);
                const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setUsers(usersList);
                setLoading(false)
            }
            getUsers();
            setPage(0);
        } catch (error) {
            Alert.alert('Error', error.message)
        }


    }, [itemsPerPage]);

    return (
        <MainLayout title="Home" navigation={navigation} name={user?.name}>

            <View style={{ padding: 16, gap: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                        Users Management (Screen)
                    </Text>
                    <Button icon="plus" mode="contained" onPress={handleAddUser}>
                        Add user
                    </Button>
                </View>

                {loading ?
                    (
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title numeric>Email</DataTable.Title>
                                <DataTable.Title numeric>First Name</DataTable.Title>
                                <DataTable.Title numeric>Last Name</DataTable.Title>
                                <DataTable.Title numeric>Actions</DataTable.Title>
                            </DataTable.Header>
                            <DataTable.Row style={{ justifyContent: 'center' }}>
                                <DataTable.Cell style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <ActivityIndicator animating={loading} color={MD2Colors.red800} size="large" style={{ marginTop: 20 }} />
                                </DataTable.Cell>
                            </DataTable.Row>

                        </DataTable>
                    )
                    :
                    users.length === 0 ?
                        (<DataTable>
                            <DataTable.Header>
                                <DataTable.Title numeric>Email</DataTable.Title>
                                <DataTable.Title numeric>First Name</DataTable.Title>
                                <DataTable.Title numeric>Last Name</DataTable.Title>
                                <DataTable.Title numeric>Actions</DataTable.Title>
                            </DataTable.Header>
                            <DataTable.Row>
                                <DataTable.Cell numeric style={{ flex: 3 }}>
                                    <Text>No users yet</Text>
                                </DataTable.Cell>
                                <DataTable.Cell numeric />
                                <DataTable.Cell numeric />
                                <DataTable.Cell numeric />
                            </DataTable.Row>
                        </DataTable>) :

                        (<DataTable>
                            <DataTable.Header>
                                <DataTable.Title numeric>Email</DataTable.Title>
                                <DataTable.Title numeric>First Name</DataTable.Title>
                                <DataTable.Title numeric>Last Name</DataTable.Title>
                                <DataTable.Title numeric>Actions</DataTable.Title>
                            </DataTable.Header>

                            {users.slice(from, to).map((user) => (
                                <DataTable.Row key={user.id}>
                                    <DataTable.Cell numeric>{user.email}</DataTable.Cell>
                                    <DataTable.Cell numeric>{user.firstname}</DataTable.Cell>
                                    <DataTable.Cell numeric>{user.lastname}</DataTable.Cell>
                                    <DataTable.Cell numeric style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <IconButton icon="pencil" size={20} onPress={() => handleEditUser(user)} />
                                        <IconButton icon="delete" size={20} onPress={() => handleDeleteUser(user)} />
                                    </DataTable.Cell>
                                </DataTable.Row>
                            ))}

                            <DataTable.Pagination
                                page={page}
                                numberOfPages={Math.ceil(users.length / itemsPerPage)}
                                onPageChange={(page) => setPage(page)}
                                label={`${from + 1}-${to} of ${users.length}`}
                                numberOfItemsPerPageList={numberOfItemsPerPageList}
                                numberOfItemsPerPage={itemsPerPage}
                                onItemsPerPageChange={onItemsPerPageChange}
                                showFastPaginationControls
                                selectPageDropdownLabel={'Rows per page'}
                            />
                        </DataTable>)
                }
            </View>
        </MainLayout>
    );





}