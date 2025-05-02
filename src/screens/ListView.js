import { BackHandler, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { fetchEditStockRequest } from '../store/actions/editStockAction';
import { Picker } from '@react-native-picker/picker';
import { fetchEditItemRequest } from '../store/actions/editItemAction';

const ListView = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const [statusUpdates, setStatusUpdates] = useState(route.params.data.equipment_details.rentalStatus);
    console.log("route.params.data--", route.params.data);

    // Handle status change
    const handleStatusChange = (id, newStatus, val) => {
        const updatedStatus = statusUpdates.map(item => {
            if (item.id === id) {
                return { ...item, status: newStatus };
            }
            return item;
        });

        setStatusUpdates(updatedStatus);

        // Trigger API call for the updated status
        const stockItem = { status: newStatus };
        dispatch(fetchEditStockRequest(id, stockItem));
    
    };

    // Render a single item (Body, Lens, Accessory) with a status dropdown
    const renderItem = (item) => {
        
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.itemName}>{item.name || item.value || item.label}</Text>
                <Picker
                    selectedValue={item.status}
                    style={styles.picker}
                    onValueChange={(itemValue) => handleStatusChange(item.id, itemValue,item)}
                >
                    <Picker.Item label="Rented Out" value="Rented Out" />
                    <Picker.Item label="Returned" value="available" />
                </Picker>
            </View>
        )
    };

    useFocusEffect(
        React.useCallback(() => {
            const handleBackPress = () => {
                navigation.goBack();
                return true; // Prevents the default back action
            };
            const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
            return () => {
                backHandler.remove();
            };
        }, [navigation])
    );

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.summaryTitle}>Submitted Equipment</Text>

                <View style={styles.section}>
                    <Text style={styles.subHeader}>Body:</Text>
                    {route.params.data.equipment_details.selectedBodies && route.params.data.equipment_details.selectedBodies.map((item, index) => (
                        <View key={index}>
                            {renderItem({ ...item, status: 'Rented Out', id: item.id })}
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.subHeader}>Lens:</Text>
                    {route.params.data.equipment_details.selectedLenses && route.params.data.equipment_details.selectedLenses.map((item, index) => (
                        <View key={index}>
                            {renderItem({ ...item, status: 'Rented Out', id: item.id })}
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.subHeader}>Accessories:</Text>
                    {route.params.data.equipment_details.selectedAccessories && route.params.data.equipment_details.selectedAccessories.map((item, index) => (
                        <View key={index}>
                            {renderItem({ ...item, status: 'Rented Out', id: item.id })}
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.subHeader}>Other Accessories:</Text>
                    {route.params.data.equipment_details.otherAccessories && route.params.data.equipment_details.otherAccessories.map((item, index) => (
                        <Text key={index}>• {item.name}</Text>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.subHeader}>Payment Details:</Text>
                    {route.params.data.equipment_details.tableItems && route.params.data.equipment_details.tableItems.map((item, index) => (
                        <View key={index} style={styles.paymentRow}>
                            <Text style={styles.paymentText}>• {item.name}</Text>
                            <Text style={styles.paymentText}>₹{item.rent} / Day</Text>
                            <Text style={styles.paymentText}>Days: {item.days}</Text>
                            <Text style={styles.paymentText}>Quantity: {item.quantity}</Text>
                        </View>
                    ))}

                    <View style={styles.paymentSummary}>
                        <Text style={styles.paymentText}>Total: ₹{route.params.data.equipment_details.totalAmount}</Text>
                        <Text style={styles.paymentText}>Discount: ₹{route.params.data.equipment_details.discount}</Text>
                        <Text style={styles.paymentText}>Paid: ₹{route.params.data.equipment_details.paid}</Text>
                        <Text style={styles.paymentText}>Outstanding: ₹{route.params.data.equipment_details.outstanding}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

export default ListView;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 15,
        marginTop: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    summaryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    section: {
        marginBottom: 5,
    },
    subHeader: {
        fontWeight: '600',
        marginTop: 5,
        marginBottom: 5,
        fontSize: 16,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    itemName: {
        flex: 1,
        fontSize: 16,
        marginLeft: 10,
    },
    picker: {
        flex: 1,
        // height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        marginTop: 5,
    },
    paymentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    paymentText: {
        fontSize: 14,
        color: '#333',
    },
    paymentSummary: {
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        marginTop: 15,
        paddingTop: 10,
    },
});
