import { View, Text, TextInput, Button, StyleSheet, BackHandler, ToastAndroid, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCreateStockRequest } from '../store/actions/createStockAction';
import { fetchStockListRequest } from '../store/actions/stockListAction';
import { fetchEditStockRequest } from '../store/actions/editStockAction';

export default function CreateStockScreen({ navigation, route }) {
    const dispatch = useDispatch();
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [status, setStatus] = useState('available'); // default status
    const { loadingCreateStock, dataCreateStock, errorCreateStock } = useSelector(state => state?.createItem);
    const { loadingStockList, dataStockList, errorStockList } = useSelector(state => state?.stockList);
    const { loadingEditStock, dataEditStock, errorEditStock } = useSelector(state => state?.editStock);

  
    const handleSave = () => {
        if (!type || !name.trim()) {
            ToastAndroid.show('Please select Type and enter Name', ToastAndroid.SHORT);
            return;
        }

        const duplicate = dataStockList && dataStockList.find(item =>
            (item.name || '').toLowerCase() === name.trim().toLowerCase() &&
            (item.brand || '').toLowerCase() === (brand || '').trim().toLowerCase() &&
            (item.type || '').toLowerCase() === (type || '').trim().toLowerCase()
        );

        if (duplicate) {
            ToastAndroid.show('Item with same Type, Name and Brand already exists', ToastAndroid.SHORT);
            return;
        }
        const stockItem = {
            type,
            name,
            brand,
            quantity,
            status,
        };

        dispatch(fetchCreateStockRequest(stockItem, navigation));
    };
    const handleUpdate = () => {
        if (!type || !name.trim()) {
            ToastAndroid.show('Please select Type and enter Name', ToastAndroid.SHORT);
            return;
        }

        const stockItem = {
            type,
            name,
            brand,
            quantity,
            status,
        };

        dispatch(fetchEditStockRequest(route.params?.data?._id, stockItem, navigation));
    };
    useEffect(() => {
        if (route.params?.data) {
            const { data } = route.params;
            setType(data?.type || '')
            setName(data?.name || '')
            setBrand(data?.brand || '')
            setQuantity(data?.quantity || 1)
            setStatus(data?.status || 'available')
        } else {
            setType('')
            setName('')
            setBrand('')
            setQuantity(1)
            setStatus('available')
        }
    }, [route.params]);

    useFocusEffect(
        React.useCallback(() => {
            dispatch(fetchStockListRequest())

            const handleBackPress = () => {
                navigation.goBack()
                return true; // Prevents the default back action
            };
            const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
            return () => {
                backHandler.remove();
            };
        }, [dispatch, navigation])
    );
    return (
        <View style={styles.container}>
            {/* Type Picker */}
            <Text style={styles.label}>Type</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={type}
                    onValueChange={(itemValue) => setType(itemValue)}
                    style={styles.picker}
                    dropdownIconColor="#555"
                >
                    <Picker.Item label="Select Type" value="" />
                    <Picker.Item label="Body" value="body" />
                    <Picker.Item label="Lens" value="lens" />
                    <Picker.Item label="Accessory" value="accessory" />
                    <Picker.Item label="Other Accessory" value="other accessory" />
                </Picker>
            </View>

            {/* Name Input */}
            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter item name"
                placeholderTextColor="#999"
            />

            {/* Brand Input */}
            <Text style={styles.label}>Brand</Text>
            <TextInput
                style={styles.input}
                value={brand}
                onChangeText={setBrand}
                placeholder="Enter brand (optional)"
                placeholderTextColor="#999"
            />

            {/* Quantity Input */}
            <Text style={styles.label}>Quantity</Text>
            <TextInput
                style={styles.input}
                value={String(quantity)}
                onChangeText={(q) => setQuantity(Number(q))}
                keyboardType="numeric"
                placeholder="Enter quantity"
                placeholderTextColor="#999"
            />

            {/* Status Picker */}
            <Text style={styles.label}>Status</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={status}
                    onValueChange={(itemValue) => setStatus(itemValue)}
                    style={styles.picker}
                    dropdownIconColor="#555"
                >
                    <Picker.Item label="Available" value="available" />
                    <Picker.Item label="Rented Out" value="rented out" />
                    <Picker.Item label="Out of Stock" value="out of stock" />
                </Picker>
            </View>

            {/* Save Button */}
            {route.params?.data ? <View style={styles.buttonContainer}>
                {loadingEditStock ? <View style={styles.submitButton}><ActivityIndicator size="small" color="grey" /></View> :
                    <Button title="Update Stock" onPress={handleUpdate} color="#4CAF50" />}
            </View> : <View style={styles.buttonContainer}>
                {loadingCreateStock ? <View style={styles.submitButton}><ActivityIndicator size="small" color="grey" /></View> :
                    <Button title="Save Stock" onPress={handleSave} color="#4CAF50" />}
            </View>}
        </View>
    );
}

const styles = StyleSheet.create({
    submitButton: { backgroundColor: 'green', padding: 15, borderRadius: 5, alignItems: 'center', margin: 20, width: '50%' },
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flex: 1,
    },
    label: {
        marginBottom: 5,
        marginTop: 15,
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#f9f9f9',
    },
    picker: {
        height: 50,
        color: '#333',
        paddingHorizontal: 10,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginTop: 5,
        backgroundColor: '#f9f9f9',
        color: '#333',
    },
    buttonContainer: {
        marginTop: 30,
        borderRadius: 8,
        overflow: 'hidden',
    },
});
