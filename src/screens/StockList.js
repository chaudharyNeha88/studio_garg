import { ActivityIndicator, BackHandler, FlatList, Image, RefreshControl, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { fetchStockListRequest } from '../store/actions/stockListAction';
import { DELETE, EDIT } from '../assets/icon';
import { BLACK, GREY, ROYAL_BLUE, WHITE } from '../assets/colors';
import { fetchDeleteStockRequest } from '../store/actions/deleteStockAction';

const StockList = ({ navigation }) => {
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = useState(false);
    const [tabs, setTabs] = useState([]);
    const { loadingStockList, dataStockList, errorStockList } = useSelector(state => state?.stockList);
    const { loadingDeleteStock, dataDeleteStock, errorDeleteStock } = useSelector(state => state?.deleteStock);

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
        }, [dispatch, navigation, dataDeleteStock])
    );

    useEffect(() => {
        if (dataStockList && dataStockList.length > 0) {
            const uniqueTypes = [...new Set(dataStockList.map(item => item.type))];
            setTabs(uniqueTypes);
        }
    }, [dataStockList]);

    const onRefresh = async () => {
        setRefreshing(true);
        dispatch(fetchStockListRequest())
        setRefreshing(false);
    };
    if (loadingStockList) {
        return (<View style={styles.mainContainer}><ActivityIndicator size="large" color="grey" /></View>)
    }
    const getStatusColor = (status) => {
        switch (status) {
            case 'available':
                return 'green';
            case 'rented out':
                return 'red';
            case 'Reserved':
                return 'yellow';
            default:
                return 'gray';
        }
    };

    // Render the items in FlatList
    const renderItem = ({ item }) => (
        <View key={item?._id} style={{ backgroundColor: WHITE, borderRadius: 8, width: '95%', padding: 10, borderWidth: 1, borderColor: ROYAL_BLUE, marginTop: 10, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
            <View style={styles.dateTxt}>
                <View style={[styles.innerContainer, { borderBottomWidth: 1, borderColor: GREY }]}>
                    <View style={{ width: '100%', }}>
                        <Text style={{ color: BLACK }}>Name:  {item.name ? item.name : 'No Name'} {item.brand ? `- ${item.brand}` : 'No Brand'}</Text>
                    </View>
                </View>
                <View style={[styles.innerContainer, { paddingVertical: 10 }]}>
                    <Text style={{ color: getStatusColor(item.status), width: '70%', alignItems: 'flex-start' }}>Status: {item.status ? item.status : 'NA'}</Text>
                    <TouchableOpacity style={{ width: '13%', justifyContent: 'center', alignItems: 'center' }} onPress={() => { dispatch(fetchDeleteStockRequest(item?._id)) }}><Image source={DELETE} style={{ width: 18, height: 18 }} resizeMode='cover' /></TouchableOpacity>
                    <TouchableOpacity style={{ width: '13%', justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation?.navigate('AddStock', { data: item })}><Image source={EDIT} style={{ width: 18, height: 18 }} resizeMode='cover' /></TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {!errorStockList ? <View style={styles.mainContainer}>
                {tabs && tabs.map((tab, index) => (
                    <View key={index}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: BLACK, marginHorizontal: 10, marginTop: 10 }}>{tab}</Text>
                        <FlatList
                            data={dataStockList.filter(item => item.type === tab)}
                            keyExtractor={(item) => item._id ? item._id.toString() : item.name} // Use name if id is missing
                            renderItem={renderItem}
                        />
                    </View>
                ))}
            </View> : <View style={styles.mainContainer}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: BLACK, marginHorizontal: 10, marginTop: 10, alignSelf: 'center' }}>{errorStockList}</Text>
            </View>}
        </ScrollView>
    )
}

export default StockList

const styles = StyleSheet.create({
    mainContainer: {
        padding: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    itemText: {
        fontSize: 16,
        flex: 1,
    },
    statusText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    innerContainer: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    dateTxt: { width: '100%', alignItems: 'center', justifyContent: 'center' },
})