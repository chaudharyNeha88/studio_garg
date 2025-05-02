import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import Checkbox from 'react-native-check-box';
import { useSelector } from 'react-redux';
import { WHITE } from '../assets/colors';

const CreateUserModal = ({ visible, onClose, onSubmit, data }) => {
    const { loadingCreateUsers, dataCreateUsers, errorCreateUsers } = useSelector(state => state?.createUser);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [permissions, setPermissions] = useState({
        canCreateTasks: false,
        canEditTasks: false,
        canCreateOrders: false,
        canEditOrders: false,
        canDeleteOrders: false,
    });

    const handleTogglePermission = (key) => {
        setPermissions({ ...permissions, [key]: !permissions[key] });
    };

    const handleSubmit = () => {
        const userData = { name, email, password, role, permissions };
        onSubmit(userData); // Send data to parent component
    };

    useEffect(() => {
        setName(data?.name)
        setEmail(data?.email)
        setRole(data?.role)
        setPermissions({
            canCreateTasks: data?.permissions?.canCreateTasks,
            canEditTasks: data?.permissions?.canEditTasks,
            canCreateOrders: data?.permissions?.canCreateOrders,
            canEditOrders: data?.permissions?.canEditOrders,
            canDeleteOrders: data?.permissions?.canDeleteOrders,
        })
    }, [data])
    
    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>Create User</Text>
                    <ScrollView>
                        {/* Name Input */}
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            value={name}
                            onChangeText={setName}
                        />

                        {/* Email Input */}
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                        />

                        {/* Password Input */}
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />

                        {/* Role Input */}
                        <TextInput
                            style={styles.input}
                            placeholder="Role"
                            value={role}
                            onChangeText={setRole}
                        />

                        {/* Permissions Section */}
                        <Text style={styles.sectionTitle}>Permissions</Text>
                        {Object.keys(permissions).map((key) => (
                            <View key={key} style={styles.checkboxContainer}>
                                <Checkbox
                                    isChecked={permissions[key]}
                                    onClick={() => handleTogglePermission(key)}
                                />
                                <Text style={styles.checkboxLabel}>{key}</Text>
                            </View>
                        ))}
                    </ScrollView>

                    {/* Buttons */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        {loadingCreateUsers ?
                        <View style={styles.submitButton}><ActivityIndicator size="small" color={WHITE} /></View> :<TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    checkboxLabel: {
        marginLeft: 10,
        fontSize: 14,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    cancelButton: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 5,
        alignItems: 'center',
    },
    submitButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginLeft: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default CreateUserModal;
