import { ActivityIndicator, BackHandler, FlatList, Image, RefreshControl, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { fetchCreateItemRequest } from '../store/actions/createItemAction';
import { BLACK, WHITE } from '../assets/colors';
import LinearGradient from 'react-native-linear-gradient';
import { Calendar } from 'react-native-calendars';
import { CALENDER } from '../assets/icon';
import DropDownPicker from 'react-native-dropdown-picker';
import { fetchEditItemRequest } from '../store/actions/editItemAction';
import { fetchStockListRequest } from '../store/actions/stockListAction';
import { fetchEditStockRequest } from '../store/actions/editStockAction';
import axios from 'axios';

const AddItem = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = useState(false);
    const { loadingCreateItem, dataCreateItem, errorCreateItem } = useSelector(state => state?.createItem);
    const { loadingEditItem, dataEditItem, errorEditItem } = useSelector(state => state?.editItem);
    const { loadingStockList, dataStockList, errorStockList } = useSelector(state => state?.stockList);
    const { data } = route.params || {};

    const onRefresh = async () => {
        setRefreshing(true);
        setRefreshing(false);
    };
    const [name, setName] = useState('');
    const [pickedBy, setPickedBy] = useState('');
    const [phone, setPhone] = useState('');
    const [pickupDate, setPickupDate] = useState('');
    const [selectPickupDate, setSelectPickupDate] = useState(false);
    const [dropDate, setDropDate] = useState('');
    const [selectDropDate, setSelectDropDate] = useState(false);
    const [otherAccessories, setOtherAccessories] = useState([{ name: '' }]);
    const [totalAmount, setTotalAmount] = useState('');
    const [discount, setDiscount] = useState('');
    const [total, setTotal] = useState('');
    const [paid, setPaid] = useState('');
    const [outstanding, setOutstanding] = useState('');
    const addOtherAccessories = () => setOtherAccessories([...otherAccessories, { name: '' }]);

    const formatToDDMMYYYY = (dateString) => {
        const [yyyy, mm, dd] = dateString.split("-");
        const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
        return `${dd}-${months[parseInt(mm, 10) - 1]}-${yyyy}`;
    };
    // Handle Body
    const [allBodies, setAllBodies] = useState([]);

    const [selectedBodies, setSelectedBodies] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownValue, setDropdownValue] = useState(null);

    const onSelectBody = (value) => {
        const selected = allBodies.find(item => item.value === value);
        if (selected) {
            setSelectedBodies(prev => [...prev, selected]);
            setAllBodies(prev => prev.filter(item => item.value !== value));
            setDropdownValue(null);
        }
    };

    // Handle Lens
    const [allLenses, setAllLenses] = useState([]);

    const [selectedLenses, setSelectedLenses] = useState([]);
    const [lensDropdownValue, setLensDropdownValue] = useState(null);
    const [lensDropdownOpen, setLensDropdownOpen] = useState(false);
    // Handle Accessories
    const [accessoryOptions, setAccessoryOptions] = useState([]);
    const [open, setOpen] = useState(false);
    const [availableItems, setAvailableItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedAccessories, setSelectedAccessories] = useState([]);

    useEffect(() => {
        if (dataStockList && dataStockList?.length > 0) {
            const bodies = dataStockList
                .filter(item => item.type === 'body' && item.status === 'available')
                .map(item => ({
                    label: `${item.name} -(${item.brand})`,
                    value: `${item.name} -(${item.brand})`,
                    name: item?.name,
                    brand: item?.brand,
                    id: item?._id,
                    status: item?.status
                }));

            const lenses = dataStockList
                .filter(item => item.type === 'lens' && item.status === 'available')
                .map(item => ({
                    label: `${item.name} -(${item.brand})`,
                    value: `${item.name} -(${item.brand})`,
                    name: item?.name,
                    brand: item?.brand,
                    id: item?._id,
                    status: item?.status
                }));

            const accessories = dataStockList
                .filter(item => item.type === 'accessory' && item.status === 'available')
                .map(item => ({
                    label: `${item.name} -(${item.brand})`,
                    value: `${item.name} -(${item.brand})`,
                    name: item?.name,
                    brand: item?.brand,
                    id: item?._id,
                    status: item?.status
                }));

            setAllBodies(bodies);
            setAllLenses(lenses);
            setAccessoryOptions(accessories);
            setAvailableItems(accessories);
        }

    }, [dataStockList])



    const handleSelect = (item) => {
        const selected = accessoryOptions.find(opt => opt.value === item);
        if (selected && !selectedAccessories.some(acc => acc.id === selected.id)) {
            setSelectedAccessories([...selectedAccessories, {
                id: selected.id,
                type: selected.value,
                label: selected.label,
                brand: '',
                quantity: 1,
            }]);
            setAvailableItems(availableItems.filter(opt => opt.value !== selected.value));
            setSelectedItem(null);
        }
    };
    const handleRemove = (itemType) => {
        setSelectedAccessories(selectedAccessories.filter(acc => acc.type !== itemType));
        const removedOption = accessoryOptions.find(opt => opt.value === itemType);
        setAvailableItems([...availableItems, removedOption]);
    };

    const updateAccessory = (type, key, value) => {
        setSelectedAccessories(prev =>
            prev.map(item =>
                item.type === type ? { ...item, [key]: value } : item
            )
        );
    };

    const [tableItems, setTableItems] = useState([]);

    useEffect(() => {
        const newItems = [];

        const processItem = (id, name, quantity = 1) => {
            // Only add if id and name are valid (not empty/null)
            if (id && name) {
                const existing = tableItems.find(item => item.id === id);
                newItems.push({
                    id,
                    name,
                    quantity,
                    rent: existing?.rent || '',
                    days: existing?.days || '',
                });
            }
        };



        selectedBodies.forEach(item => processItem(item.value, item.label));
        selectedLenses.forEach(item => processItem(item.value, item.label));
        selectedAccessories.forEach(item =>
            processItem(item.label, `${item.label} - ${item.brand}`, item.quantity)
        );
        otherAccessories.forEach(item => processItem(item.name));

        setTableItems(newItems);
    }, [selectedBodies, selectedLenses, selectedAccessories, otherAccessories]);
    const updateItem = (index, key, value) => {
        const updated = [...tableItems];
        updated[index][key] = value;
        setTableItems(updated);
    };
    useEffect(() => {
        let total = 0;
        tableItems.forEach(item => {
            const rent = parseFloat(item.rent || 0);
            const days = parseFloat(item.days || 0);
            const qty = parseInt(item.quantity || 1);
            const lineTotal = rent * days * qty;
            if (!isNaN(lineTotal)) {
                total += lineTotal;
            }
        });
        setTotalAmount(total);
    }, [tableItems]);
    useEffect(() => {
        const discountNum = parseFloat(discount) || 0;
        const paidNum = parseFloat(paid) || 0;

        const balance = totalAmount - discountNum;
        const due = balance - paidNum;

        setTotal(balance >= 0 ? balance : 0);
        setOutstanding(due >= 0 ? due : 0);
    }, [totalAmount, discount, paid]);

    // Handle Submit
   
    const handleSubmit = async () => {
        const rentalStatus = [];

        // Collect all items into one array for easier processing
        const allItems = [
            ...selectedBodies.map(item => ({ id: item._id || item.id, status: 'Rented Out' })),
            ...selectedLenses.map(item => ({ id: item._id || item.id, status: 'Rented Out' })),
            ...selectedAccessories.map(item => ({ id: item._id || item.id, status: 'Rented Out' })),
        ];

        try {
            // Update stock status for each item one by one
            for (const item of allItems) {
                const stockItem = { status: item.status };
                await dispatch(fetchEditStockRequest(item.id, stockItem));
            }

            // Now prepare the rentalStatus as before
            if (selectedBodies.length > 0) {
                rentalStatus.push(
                    ...selectedBodies.map(item => ({
                        type: 'body',
                        name: item.label,
                        status: 'Rented Out',
                        id:item.id
                    }))
                );
            }

            if (selectedLenses.length > 0) {
                rentalStatus.push(
                    ...selectedLenses.map(item => ({
                        type: 'lens',
                        name: item.label,
                        status: 'Rented Out',
                        id:item.id
                    }))
                );
            }

            if (selectedAccessories.length > 0) {
                rentalStatus.push(
                    ...selectedAccessories.map(item => ({
                        type: 'accessory',
                        name: item.label,
                        brand: item.brand,
                        quantity: item.quantity,
                        status: 'Rented Out',
                        id:item.id
                    }))
                );
            }

            if (otherAccessories.length > 0) {
                rentalStatus.push(
                    ...otherAccessories.map(item => ({
                        type: 'other accessory',
                        name: item.name,
                        status: 'Rented Out',
                    }))
                );
            }

            const dataa = {
                name,
                picked_by: pickedBy,
                phone,
                picked_up_dateTime: pickupDate,
                drop_dateTime: dropDate,
                equipment_details: {
                    selectedBodies,
                    selectedLenses,
                    selectedAccessories,
                    otherAccessories,
                    tableItems,
                    totalAmount,
                    discount,
                    total,
                    paid,
                    outstanding,
                    rentalStatus
                }
            };

            // Finally, create the rental item
            dispatch(fetchCreateItemRequest(dataa, navigation));

        } catch (error) {
            console.error('Failed to update stock status:', error);
        }
    };

    const handleUpdate = async () => {
        const rentalStatus = [];
 
        const allItems = [
            ...selectedBodies.map(item => ({ id: item._id || item.id, status: 'Rented Out' })),
            ...selectedLenses.map(item => ({ id: item._id || item.id, status: 'Rented Out' })),
            ...selectedAccessories.map(item => ({ id: item._id || item.id, status: 'Rented Out' })),
        ];
   
        try {

            // for (const item of allItems) {
            //     const stockItem = { status: item.status };
  
            //     await dispatch(fetchEditStockRequest(item.id, stockItem));
            // }

            const updatePromises = allItems.map(item => {
                const stockItem = { status: item.status };
                return dispatch(fetchEditStockRequest(item.id, stockItem));
              });
            
              await Promise.all(updatePromises);

            if (selectedBodies.length > 0) {
                rentalStatus.push(
                    ...selectedBodies.map(item => ({
                        type: 'body',
                        name: item.label,
                        status: 'Rented Out',
                        id:item.id
                    }))
                );
            }

            if (selectedLenses.length > 0) {
                rentalStatus.push(
                    ...selectedLenses.map(item => ({
                        type: 'lens',
                        name: item.label,
                        status: 'Rented Out',
                        id:item.id
                    }))
                );
            }

            if (selectedAccessories.length > 0) {
                rentalStatus.push(
                    ...selectedAccessories.map(item => ({
                        type: 'accessory',
                        name: item.label,
                        brand: item.brand,
                        quantity: item.quantity,
                        status: 'Rented Out',
                        id:item.id
                    }))
                );
            }

            if (otherAccessories.length > 0) {
                rentalStatus.push(
                    ...otherAccessories.map(item => ({
                        type: 'other accessory',
                        name: item.name,
                        status: 'Rented Out',
                    }))
                );
            }
            const dataa = {
                name,
                picked_by: pickedBy,
                phone,
                picked_up_dateTime: pickupDate,
                drop_dateTime: dropDate,
                equipment_details: {
                    selectedBodies,
                    selectedLenses,
                    selectedAccessories,
                    otherAccessories,
                    tableItems,
                    totalAmount,
                    discount,
                    total,
                    paid,
                    outstanding,
                    rentalStatus
                }
            }
            dispatch(fetchEditItemRequest(data?._id, dataa, navigation))
        } catch (error) {
            console.error('Failed to update stock status:', error);
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            dispatch(fetchStockListRequest())
            if (data) {
                setName(data.name || '');
                setPickedBy(data.picked_by || '');
                setPhone(data.phone || '');
                setPickupDate(data.picked_up_dateTime || '');
                setDropDate(data.drop_dateTime || '');

                const equip = data.equipment_details || {};

                setSelectedBodies(equip.selectedBodies || []);
                setSelectedLenses(equip.selectedLenses || []);
                setSelectedAccessories(equip.selectedAccessories || []);
                setOtherAccessories(equip.otherAccessories || [{ name: '' }]);
                setTableItems(equip.tableItems || []);
                setTotalAmount(equip.totalAmount || '');
                setDiscount(equip.discount || '');
                setTotal(equip.total || '');
                setPaid(equip.paid || '');
                setOutstanding(equip.outstanding || '');

                // Optional: update dropdowns if needed (like removing already selected from available lists)
                const usedAccessoryTypes = (equip.selectedAccessories || []).map(item => item.type);
                setAvailableItems(accessoryOptions.filter(item => !usedAccessoryTypes.includes(item.value)));

                const usedBodyValues = (equip.selectedBodies || []).map(item => item.value);
                setAllBodies(prev => prev.filter(item => !usedBodyValues.includes(item.value)));

                const usedLensValues = (equip.selectedLenses || []).map(item => item.value);
                setAllLenses(prev => prev.filter(item => !usedLensValues.includes(item.value)));
            } else {
                setName('')
                setPickedBy('')
                setPhone('')
                setPickupDate('')
                setDropDate('')
                setSelectedBodies([])
                setSelectedLenses([])
                setTableItems([])
                setSelectedAccessories([])
                setOtherAccessories([{ name: '' }])
                setTotalAmount('')
                setDiscount('')
                setTotal('')
                setPaid('')
                setOutstanding('')
            }
            const handleBackPress = () => {
                navigation.goBack()
                return true; // Prevents the default back action
            };
            const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
            return () => {
                backHandler.remove();
            };
        }, [dispatch, navigation, dataCreateItem, data])
    );

    const returnedHandler= async (item)=>{
        

        
        try {
            console.log("called")
            const res= await axios.post(`http://192.168.19.236:5000/order/return`, {
              bookingId:data?._id,
              equipmentId:item?.id
            });
            console.log(res)
          } catch (error) {
            console.log(error)
            throw new Error(error.response?.data?.error || 'Something went wrong');
          }

    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View style={styles.mainContainer}>
                <Text style={styles.title}>Equipment Rental Form</Text>

                {/* Personal Info */}
                <LinearGradient
                    colors={['#4A6EFB', 'rgb(227 241 255)', '#4A6EFB']} // Gradient colors
                    start={{ x: 3, y: -1 }} // Top-right corner
                    end={{ x: -1.5, y: 3 }}
                    style={{ borderRadius: 20, marginBottom: 15, alignItems: 'center', justifyContent: 'center', width: '100%', backgroundColor: WHITE, padding: 10 }}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Picked By</Text>
                        <TextInput style={styles.input} placeholder="Picked By" value={pickedBy} onChangeText={setPickedBy} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Phone</Text>
                        <TextInput style={styles.input} placeholder="Phone" keyboardType="numeric" value={phone} onChangeText={setPhone} maxLength={10} />
                    </View>
                    <TouchableOpacity style={styles.inputContainer} onPress={() => setSelectPickupDate(!selectPickupDate)}>
                        <Text style={styles.label}>Pickup Date</Text>
                        <View style={[styles.input, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                            <Text style={styles.label}>{pickupDate ? formatToDDMMYYYY(pickupDate) : 'Select Pickup Date (e.g., 25 Jan 25 11:05)'}</Text>
                            <Image source={CALENDER} style={{ width: 20, height: 20 }} />
                        </View>
                    </TouchableOpacity>
                    {selectPickupDate &&
                        <Calendar
                            style={{
                                height: 350,
                                width: 350
                            }}
                            onDayPress={day => {
                                setPickupDate(day.dateString), setSelectPickupDate(false)
                            }}
                            markedDates={{
                                [pickupDate]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
                            }}
                        />}
                    <TouchableOpacity style={styles.inputContainer} onPress={() => setSelectDropDate(!selectDropDate)}>
                        <Text style={styles.label}>Drop Date</Text>
                        <View style={[styles.input, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                            <Text style={styles.label}>{dropDate ? formatToDDMMYYYY(dropDate) : 'Select Drop Date (e.g., 25 Jan 25 11:05)'}</Text>
                            <Image source={CALENDER} style={{ width: 20, height: 20 }} />
                        </View>
                    </TouchableOpacity>
                    {selectDropDate &&
                        <Calendar
                            style={{
                                height: 350,
                                width: 350
                            }}
                            onDayPress={day => {
                                setDropDate(day.dateString), setSelectDropDate(false)
                            }}
                            markedDates={{
                                [dropDate]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
                            }}
                        />}
                </LinearGradient>
                {/* Equipment Details */}
                <LinearGradient
                    colors={['#4A6EFB', 'rgb(227 241 255)', '#4A6EFB']}
                    start={{ x: 3, y: -1 }}
                    end={{ x: -1.5, y: 3 }}
                    style={{
                        borderRadius: 20,
                        marginBottom: 15,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        width: '100%',
                        padding: 10,
                    }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Body</Text>
                    <View style={{ zIndex: dropdownOpen ? 2000 : 999 }}>
                        <DropDownPicker
                            open={dropdownOpen}
                            value={dropdownValue}
                            items={allBodies}
                            setOpen={setDropdownOpen}
                            setValue={setDropdownValue}
                            onSelectItem={(item) => onSelectBody(item.value)}
                            placeholder="Select a body"
                            searchable={true}
                            
                            // zIndex={1000}
                            // zIndexInverse={3000}
                            style={{ width: '100%', marginBottom: dropdownOpen ? 150 : 15 }}
                        />
                    </View>
                    {selectedBodies.map((item, index) => (
                        <View key={index} style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 8,
                            backgroundColor: '#fff',
                            marginVertical: 5,
                            width: '100%',
                            borderRadius: 8
                        }}>
                            <Text>{item.label}</Text>
                            <TouchableOpacity onPress={()=>returnedHandler(item)}>
                                <Text>click me to Returned</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                // Remove from selected list
                                setSelectedBodies(prev => prev.filter((_, i) => i !== index));
                                // Add back to dropdown list
                                setAllBodies(prev => [...prev, item]);
                                // Ensure dropdown selection is cleared if needed
                                setDropdownValue(null);
                            }}>
                                <Text style={{ color: 'red', fontWeight: 'bold' }}>❌</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </LinearGradient>
                <LinearGradient
                    colors={['#4A6EFB', 'rgb(227 241 255)', '#4A6EFB']}
                    start={{ x: 3, y: -1 }}
                    end={{ x: -1.5, y: 3 }}
                    style={{
                        borderRadius: 20,
                        marginBottom: 15,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        width: '100%',
                        padding: 10,
                    }}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginBottom: 10,
                        color: '#000'
                    }}>Lens</Text>

                    {/* Dropdown */}
                    <View style={{ zIndex: lensDropdownOpen ? 2000 : 999 }}>
                        <DropDownPicker
                            open={lensDropdownOpen}
                            value={lensDropdownValue}
                            items={allLenses}
                            setOpen={setLensDropdownOpen}
                            setValue={setLensDropdownValue}
                            setItems={setAllLenses}
                            placeholder="Select a lens"
                            searchable={true}
                            style={{ marginBottom: lensDropdownOpen ? 150 : 15 }}
                            onSelectItem={(item) => {
                                setSelectedLenses(prev => [...prev, item]);
                                setAllLenses(prev => prev.filter(l => l.value !== item.value));
                                setLensDropdownValue(null);
                                setLensDropdownOpen(false);
                            }}
                        />
                    </View>

                    {/* Selected Lenses List */}
                    {selectedLenses.map((item, index) => (
                        <View key={index} style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 10,
                            backgroundColor: '#fff',
                            marginVertical: 5,
                            width: '100%',
                            borderRadius: 8
                        }}>
                            <Text>{item.label}</Text>
                            <TouchableOpacity onPress={() => {
                                setSelectedLenses(prev => prev.filter((_, i) => i !== index));
                                setAllLenses(prev => [...prev, item]);
                                setLensDropdownValue(null);
                            }}>
                                <Text style={{ color: 'red', fontWeight: 'bold' }}>❌</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </LinearGradient>

                {/* Accessories */}
                <LinearGradient
                    colors={['#4A6EFB', 'rgb(227 241 255)', '#4A6EFB']}
                    start={{ x: 3, y: -1 }}
                    end={{ x: -1.5, y: 3 }}
                    style={{
                        borderRadius: 20,
                        marginBottom: 15,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        width: '100%',
                        padding: 10,
                    }}>
                    <Text style={styles.sectionTitle}>Accessories</Text>
                    <View style={{ zIndex: open ? 2000 : 999 }}>
                    <DropDownPicker
                        open={open}
                        value={selectedItem}
                        items={availableItems}
                        setOpen={setOpen}
                        setValue={setSelectedItem}
                        onSelectItem={(item) => handleSelect(item.value)}
                        placeholder="Select an accessory"
                        style={{ marginBottom: open ? 150 : 15 }}
                    /></View>

                    {selectedAccessories.map((item) => (
                        <View key={item.type} style={styles.row}>
                            <Text style={[styles.label, { width: '30%' }]}>{item.label}</Text>
                            <TextInput
                                placeholder="Brand"
                                style={[styles.input, { width: '35%', padding: 0, paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center' }]}
                                value={item.brand}
                                onChangeText={(text) => updateAccessory(item.type, 'brand', text)}
                            />
                            <View style={styles.quantityBox}>
                                <TouchableOpacity onPress={() => updateAccessory(item.type, 'quantity', Math.max(item.quantity - 1, 1))}>
                                    <Text style={styles.quantityButton}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.quantityText}>{item.quantity}</Text>
                                <TouchableOpacity onPress={() => updateAccessory(item.type, 'quantity', item.quantity + 1)}>
                                    <Text style={styles.quantityButton}>+</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => handleRemove(item.type)}>
                                <Text style={styles.remove}>✕</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </LinearGradient>
                {/* Other Accessories */}
                <LinearGradient
                    colors={['#4A6EFB', 'rgb(227 241 255)', '#4A6EFB']}
                    start={{ x: 3, y: -1 }}
                    end={{ x: -1.5, y: 3 }}
                    style={{
                        borderRadius: 20,
                        marginBottom: 15,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        width: '100%',
                        padding: 10,
                    }}>
                    <Text style={styles.sectionTitle}>Other Accessories</Text>
                    {otherAccessories.map((item, index) => (
                        <TextInput key={index} style={styles.input} placeholder="Other Accessory Name" value={item.name} onChangeText={(text) => {
                            let newItems = [...otherAccessories];
                            newItems[index].name = text;
                            setOtherAccessories(newItems);
                        }} />
                    ))}
                    <TouchableOpacity style={[styles.addButton, { alignSelf: 'center' }]} onPress={addOtherAccessories}>
                        <Text style={styles.addButtonText}>+ Add Other Accessory</Text>
                    </TouchableOpacity>
                </LinearGradient>
                {/* Payment Details */}
                <LinearGradient
                    colors={['#4A6EFB', 'rgb(227 241 255)', '#4A6EFB']}
                    start={{ x: 3, y: -1 }}
                    end={{ x: -1.5, y: 3 }}
                    style={{
                        borderRadius: 20,
                        marginBottom: 15,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        width: '100%',
                        padding: 10,
                    }}>
                    <Text style={styles.sectionTitle}>Payment Details</Text>

                    <View style={styles.tableHeader}>
                        <Text style={[styles.cell, { width: '30%' }]}>Equipment</Text>
                        <Text style={[styles.cell, { width: '22%' }]}>Rent/Day</Text>
                        <Text style={[styles.cell, { width: '15%' }]}>Days</Text>
                        <Text style={[styles.cell, { width: '12%' }]}>Qty</Text>
                        <Text style={[styles.cell, { width: '20%' }]}>Total</Text>
                    </View>

                    <ScrollView style={{ width: '100%' }}>
                        {tableItems.map((item, index) => {
                            const total =
                                (parseFloat(item.rent || 0) *
                                    parseFloat(item.days || 0) *
                                    parseInt(item.quantity || 1));

                            return (
                                <View key={item.id} style={styles.tableRow}>
                                    <Text style={[styles.cell, { width: '30%' }]}>{item.name}</Text>

                                    <TextInput
                                        style={[styles.inputCell, { width: '22%' }]}
                                        keyboardType="numeric"
                                        placeholder="Rent"
                                        value={item.rent}
                                        onChangeText={(val) => updateItem(index, 'rent', val)}
                                    />

                                    <TextInput
                                        style={[styles.inputCell, { width: '15%' }]}
                                        keyboardType="numeric"
                                        placeholder="Days"
                                        value={item.days}
                                        onChangeText={(val) => updateItem(index, 'days', val)}
                                    />

                                    <Text style={[styles.cell, { width: '12%' }]}>{item.quantity}</Text>

                                    <Text style={[styles.cell, { width: '20%' }]}>{isNaN(total) ? '-' : total}</Text>
                                </View>
                            );
                        })}
                    </ScrollView>
                </LinearGradient>

                {/* Final Amounts */}
                <LinearGradient
                    colors={['#4A6EFB', 'rgb(227 241 255)', '#4A6EFB']}
                    start={{ x: 3, y: -1 }}
                    end={{ x: -1.5, y: 3 }}
                    style={{
                        borderRadius: 20,
                        marginBottom: 15,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        width: '100%',
                        padding: 10,
                    }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <View style={[styles.inputContainer, { width: '49%' }]}>
                            <Text style={styles.label}>Total Amount</Text>
                            <TextInput style={styles.input} placeholder="Total Amount" keyboardType="numeric" value={totalAmount.toString()} onChangeText={(text) => setTotalAmount(Number(text))} />
                        </View>
                        <View style={[styles.inputContainer, { width: '49%' }]}>
                            <Text style={styles.label}>Discount</Text>
                            <TextInput style={styles.input} placeholder="Discount" keyboardType="numeric" value={discount} onChangeText={setDiscount} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <View style={[styles.inputContainer, { width: '49%' }]}>
                            <Text style={styles.label}>Total Balance</Text>
                            <TextInput style={styles.input} placeholder="Total balance" keyboardType="numeric" value={total.toString()} onChangeText={setTotal} />

                        </View>
                        <View style={[styles.inputContainer, { width: '49%' }]}>
                            <Text style={styles.label}>Paid</Text>
                            <TextInput style={styles.input} placeholder="Paid" keyboardType="numeric" value={paid} onChangeText={setPaid} />
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Outstanding</Text>
                        <TextInput style={styles.input} placeholder="Outstanding" keyboardType="numeric" value={outstanding.toString()} onChangeText={setOutstanding} />

                    </View>
                </LinearGradient>

                {/* Submit Button */}
                {data ? (loadingEditItem ?
                    <View style={styles.submitButton}><ActivityIndicator size="small" color="grey" /></View>
                    : <TouchableOpacity style={styles.submitButton} onPress={handleUpdate}>
                        <Text style={styles.buttonText}>Update</Text>
                    </TouchableOpacity>) : loadingCreateItem ?
                    <View style={styles.submitButton}><ActivityIndicator size="small" color="grey" /></View>
                    : <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>}
            </View>
        </ScrollView>
    )
}

export default AddItem

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F9F9F9',
        padding: 20
    },
    container: { flex: 1, padding: 20, backgroundColor: '#F5F5F5' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    input: { backgroundColor: 'white', padding: 10, borderRadius: 5, marginBottom: 10, borderWidth: 1, borderColor: '#ddd', width: '100%' },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 10, marginBottom: 5, alignSelf: 'flex-start' },
    addButton: { backgroundColor: '#007BFF', padding: 10, borderRadius: 5, alignItems: 'center', marginBottom: 10 },
    addButtonText: { color: 'white', fontWeight: 'bold' },
    submitButton: { backgroundColor: 'green', padding: 15, borderRadius: 5, alignItems: 'center', marginTop: 20, width: '50%' },
    buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
    inputContainer: {
        marginBottom: 10,
        width: '100%'
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: 'black',
        marginBottom: 5,
    },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
        justifyContent: 'space-between'
    },
    quantityBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 6,
        borderColor: '#ccc',
        width: '25%',
        justifyContent: 'space-between'
    },
    quantityButton: { fontSize: 18, paddingHorizontal: 6 },
    quantityText: { paddingHorizontal: 6 },
    remove: { color: 'red', fontSize: 18, marginLeft: 5 },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#eee',
        padding: 5,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    tableRow: {
        flexDirection: 'row',
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        alignItems: 'center',
        width: '100%',
        backgroundColor: WHITE,
        borderRadius: 10,
        marginVertical: 5
    },
    cell: {
        fontSize: 14,
        textAlign: 'center',
    },
    inputCell: {
        fontSize: 14,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 4,
        textAlign: 'center',
        marginHorizontal: 2,
    },

})