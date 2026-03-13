import React, { useState, useContext } from 'react';
import MainLayout from '../components/layouts/AppLayout';
import { AuthContext } from '../contexts/AuthContext';
import { DataTable } from 'react-native-paper';
import { View, Text } from 'react-native';
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
     


    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, users.length);

    React.useEffect(() => {
        const getUsers = async () => {
            const usersCol = collection(db, 'users_basic');
            const usersSnapshot = await getDocs(usersCol);
            console.log('Fetched users from Firestore:', usersSnapshot.docs);
            const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUsers(usersList);
        }
        getUsers();
        setPage(0);
    }, [itemsPerPage]);

    return (
        <MainLayout title="Home" navigation={navigation} username={user?.email}>

            <View style={{ padding: 16, gap: 10 }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                    Users Management (Screen)
                </Text>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title numeric>Email</DataTable.Title>
                        <DataTable.Title numeric>First Name</DataTable.Title>
                        <DataTable.Title numeric>Last Name</DataTable.Title>
                    </DataTable.Header>

                    {users.slice(from, to).map((user) => (
                        <DataTable.Row key={user.email}>
                            <DataTable.Cell numeric>{user.email}</DataTable.Cell>
                            <DataTable.Cell numeric>{user.firstname}</DataTable.Cell>
                            <DataTable.Cell numeric>{user.lastname}</DataTable.Cell>
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
                </DataTable>
            </View>
        </MainLayout>
    );
}