import React, { useState, useContext, useCallback } from 'react';
import MainLayout from '../components/layouts/AppLayout';
import { AuthContext } from '../contexts/AuthContext';
import { DataTable, ActivityIndicator, Button, IconButton, Text, useTheme, Dialog, Portal, TextInput as PaperInput, Snackbar } from 'react-native-paper';
import { View, Alert, StyleSheet } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
export default function UsersScreen({ navigation }) {

    const { user } = useContext(AuthContext);
    const theme = useTheme();
    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(
        numberOfItemsPerPageList[0]
    );

    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = useState(true);

    // Dialog state
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogMode, setDialogMode] = useState('add'); // 'add' | 'edit'
    const [editingUser, setEditingUser] = useState(null);
    const [formEmail, setFormEmail] = useState('');
    const [formFirstname, setFormFirstname] = useState('');
    const [formLastname, setFormLastname] = useState('');
    const [saving, setSaving] = useState(false);

    // Delete confirm dialog
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [deletingUser, setDeletingUser] = useState(null);
    const [deleting, setDeleting] = useState(false);

    // Snackbar feedback
    const [snackMessage, setSnackMessage] = useState('');
    const [snackVisible, setSnackVisible] = useState(false);
    const showSnack = (msg) => { setSnackMessage(msg); setSnackVisible(true); };

    // ── Fetch ────────────────────────────────────────────────────────────────
    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const usersCol = collection(db, 'users_basic');
            const usersSnapshot = await getDocs(usersCol);
            const usersList = usersSnapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
            setUsers(usersList);
            setPage(0);
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    React.useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // ── Handlers ─────────────────────────────────────────────────────────────
    const handleAddUser = () => {
        setFormEmail('');
        setFormFirstname('');
        setFormLastname('');
        setDialogMode('add');
        setEditingUser(null);
        setDialogVisible(true);
    };

    const handleEditUser = (item) => {
        setFormEmail(item.email ?? '');
        setFormFirstname(item.firstname ?? '');
        setFormLastname(item.lastname ?? '');
        setDialogMode('edit');
        setEditingUser(item);
        setDialogVisible(true);
    };

    const handleSave = async () => {
        if (!formEmail.trim()) {
            Alert.alert('Validation', 'Email is required.');
            return;
        }
        setSaving(true);
        try {
            if (dialogMode === 'add') {
                await addDoc(collection(db, 'users_basic'), {
                    email: formEmail.trim(),
                    firstname: formFirstname.trim(),
                    lastname: formLastname.trim(),
                });
                showSnack('User added successfully.');
            } else {
                const userRef = doc(db, 'users_basic', editingUser.id);
                await updateDoc(userRef, {
                    email: formEmail.trim(),
                    firstname: formFirstname.trim(),
                    lastname: formLastname.trim(),
                });
                showSnack('User updated successfully.');
            }
            setDialogVisible(false);
            fetchUsers();
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDeletePress = (item) => {
        setDeletingUser(item);
        setDeleteDialogVisible(true);
    };

    const handleDeleteConfirm = async () => {
        if (!deletingUser) return;
        setDeleting(true);
        try {
            await deleteDoc(doc(db, 'users_basic', deletingUser.id));
            setDeleteDialogVisible(false);
            setDeletingUser(null);
            showSnack('User deleted.');
            fetchUsers();
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setDeleting(false);
        }
    };

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, users.length);

    return (
        <MainLayout title="Users" navigation={navigation} name={user?.name}>
            <Portal>
                {/* Add / Edit Dialog */}
                <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
                    <Dialog.Title>{dialogMode === 'add' ? 'Add User' : 'Edit User'}</Dialog.Title>
                    <Dialog.Content style={{ gap: 10 }}>
                        <PaperInput
                            label="Email"
                            value={formEmail}
                            onChangeText={setFormEmail}
                            mode="outlined"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            left={<PaperInput.Icon icon="email" />}
                        />
                        <PaperInput
                            label="First Name"
                            value={formFirstname}
                            onChangeText={setFormFirstname}
                            mode="outlined"
                            left={<PaperInput.Icon icon="account" />}
                        />
                        <PaperInput
                            label="Last Name"
                            value={formLastname}
                            onChangeText={setFormLastname}
                            mode="outlined"
                            left={<PaperInput.Icon icon="account" />}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setDialogVisible(false)}>Cancel</Button>
                        <Button mode="contained" onPress={handleSave} loading={saving} disabled={saving}>
                            {dialogMode === 'add' ? 'Add' : 'Save'}
                        </Button>
                    </Dialog.Actions>
                </Dialog>

                {/* Delete Confirm Dialog */}
                <Dialog visible={deleteDialogVisible} onDismiss={() => setDeleteDialogVisible(false)}>
                    <Dialog.Icon icon="alert-circle" />
                    <Dialog.Title>Delete User</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">
                            Are you sure you want to delete {deletingUser?.email}? This cannot be undone.
                        </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setDeleteDialogVisible(false)}>Cancel</Button>
                        <Button
                            mode="contained"
                            buttonColor={theme.colors.error}
                            onPress={handleDeleteConfirm}
                            loading={deleting}
                            disabled={deleting}
                        >
                            Delete
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

            <View style={{ gap: 12 }}>
                <View style={styles.toolbar}>
                    <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>
                        Users Management
                    </Text>
                    <Button icon="plus" mode="contained" onPress={handleAddUser}>
                        Add user
                    </Button>
                </View>

                {loading ?
                    (
                        <DataTable style={styles.table}>
                            <DataTable.Header style={styles.tableHeader}>
                                <DataTable.Title>Email</DataTable.Title>
                                <DataTable.Title>First Name</DataTable.Title>
                                <DataTable.Title>Last Name</DataTable.Title>
                                <DataTable.Title numeric>Actions</DataTable.Title>
                            </DataTable.Header>
                            <DataTable.Row style={{ justifyContent: 'center' }}>
                                <DataTable.Cell style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <ActivityIndicator animating={true} color={theme.colors.primary} size="large" style={{ marginVertical: 16 }} />
                                </DataTable.Cell>
                            </DataTable.Row>
                        </DataTable>
                    )
                    :
                    users.length === 0 ?
                        (<DataTable style={styles.table}>
                            <DataTable.Header style={styles.tableHeader}>
                                <DataTable.Title>Email</DataTable.Title>
                                <DataTable.Title>First Name</DataTable.Title>
                                <DataTable.Title>Last Name</DataTable.Title>
                                <DataTable.Title numeric>Actions</DataTable.Title>
                            </DataTable.Header>
                            <DataTable.Row>
                                <DataTable.Cell style={{ flex: 4 }}>
                                    <Text variant="bodyMedium" style={{ opacity: 0.6 }}>No users yet</Text>
                                </DataTable.Cell>
                            </DataTable.Row>
                        </DataTable>) :

                        (<DataTable style={styles.table}>
                            <DataTable.Header style={styles.tableHeader}>
                                <DataTable.Title>Email</DataTable.Title>
                                <DataTable.Title>First Name</DataTable.Title>
                                <DataTable.Title>Last Name</DataTable.Title>
                                <DataTable.Title numeric>Actions</DataTable.Title>
                            </DataTable.Header>

                            {users.slice(from, to).map((item) => (
                                <DataTable.Row key={item.id}>
                                    <DataTable.Cell>{item.email}</DataTable.Cell>
                                    <DataTable.Cell>{item.firstname}</DataTable.Cell>
                                    <DataTable.Cell>{item.lastname}</DataTable.Cell>
                                    <DataTable.Cell numeric>
                                        <View style={{ flexDirection: 'row' }}>
                                            <IconButton icon="pencil" size={18} onPress={() => handleEditUser(item)} />
                                            <IconButton icon="delete" size={18} iconColor={theme.colors.error} onPress={() => handleDeletePress(item)} />
                                        </View>
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

            <Snackbar
                visible={snackVisible}
                onDismiss={() => setSnackVisible(false)}
                duration={2500}
            >
                {snackMessage}
            </Snackbar>
        </MainLayout>
    );
}

const styles = StyleSheet.create({
    toolbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    table: {
        backgroundColor: '#FFFBFE',
        borderRadius: 12,
    },
    tableHeader: {
        backgroundColor: '#F3EDF7',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
});