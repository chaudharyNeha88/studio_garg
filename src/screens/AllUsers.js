import { ActivityIndicator, BackHandler, FlatList, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { fetchUsersRequest } from '../store/actions/usersAction';
import { BLACK, GREY, WHITE } from '../assets/colors';
import { EDIT } from '../assets/icon';
import CreateUserModal from '../components/CreateUserModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchCreateUsersRequest } from '../store/actions/createUserAction';
import { fetchProfileRequest } from '../store/actions/profileAction';
import { fetchUpdateUserRequest } from '../store/actions/userUpdateAction';

const AllUsers = ({ navigation }) => {
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = useState(false);
    const [permissions, setpermissions] = useState('')
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectItem, setSelectItem] = useState('')
    const { loadingUsers, dataUsers, errorUsers } = useSelector(state => state?.userData);
    const { loadingProfile, dataProfile, errorProfile } = useSelector(state => state?.profile);
    const { loadingCreateUsers, dataCreateUsers, errorCreateUsers } = useSelector(state => state?.createUser);
    const { loadingUpdateUser, dataUpdateUser, errorUpdateUser } = useSelector(state => state?.updateUser);

    const handleCreateUser = (userData) => {
        dispatch(fetchUpdateUserRequest(selectItem?._id, userData?.permissions?.canCreateTasks, userData?.permissions?.canEditTasks, userData?.permissions?.canCreateOrders, userData?.permissions?.canEditOrders, userData?.permissions?.canDeleteOrders, userData?.role))
    };
    const checkAuthPermission = async () => {
        try {
            const userPermission = await AsyncStorage.getItem('userPermission');
            if (userPermission) {
                setpermissions(JSON.parse(userPermission));
            } else {
                setpermissions('');
            }
        } catch (error) {
            setpermissions('');
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            dispatch(fetchProfileRequest())
            dispatch(fetchUsersRequest())
            const handleBackPress = () => {
                navigation.goBack()
                return true; // Prevents the default back action
            };
            const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
            return () => {
                backHandler.remove();
            };
        }, [dispatch, navigation, dataUpdateUser])
    );

    useEffect(() => {
        checkAuthPermission()
    }, [dataProfile])

    useEffect(() => { setModalVisible(false) }, [dataUpdateUser])

    const onRefresh = async () => {
        setRefreshing(true);
        dispatch(fetchProfileRequest())
        dispatch(fetchUsersRequest())
        setRefreshing(false);
    };

    const renderItem = ({ item }) => (
        <>
            {(permissions && permissions?.data?.permissions?.canEditTasks) || permissions?.data?.role === 'admin' ? <TouchableOpacity onPress={() => {setSelectItem(item), setModalVisible(true) }} key={item?._id} style={[styles.container, { borderBottomWidth: 1, borderColor: GREY, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
                <View>
                    <Text style={styles.txtstyles}>Name: {item?.name}</Text>
                    <Text style={styles.txtstyles}>Email: {item?.email}</Text>
                    <Text style={styles.txtstyles}>Role: {item?.role}</Text>
                </View>
                <Image source={EDIT} style={{ width: 15, height: 15 }} />
            </TouchableOpacity> :
                <View key={item?._id} style={[styles.container, { borderBottomWidth: 1, borderColor: GREY }]}>
                    <Text style={styles.txtstyles}>Name: {item?.name}</Text>
                    <Text style={styles.txtstyles}>Email: {item?.email}</Text>
                    <Text style={styles.txtstyles}>Role: {item?.role}</Text>
                </View>}
        </>
    )

    if (loadingUsers) {
        return (<View style={styles.mainContainer}><ActivityIndicator size="large" color="grey" /></View>)
    }
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    <FlatList
                        data={dataUsers?.data}
                        renderItem={renderItem}
                        scrollEnabled={false}
                    />
                </View>
                <CreateUserModal
                    visible={isModalVisible}
                    onClose={() => setModalVisible(false)}
                    onSubmit={handleCreateUser}
                    data={selectItem}
                />
            </View>
        </ScrollView>
    )
}

export default AllUsers

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F9F9F9',
        paddingBottom: 20
    },
    container: {
        borderRadius: 10,
        backgroundColor: WHITE,
        padding: 10,
        width: '95%',
        margin: 10
    },
    txtstyles: {
        color: BLACK,
    }
})