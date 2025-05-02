import React, { use, useEffect, useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, ScrollView, Image, ActivityIndicator, BackHandler, AppState, ToastAndroid, RefreshControl, Alert, Dimensions, View, Text, Platform, KeyboardAvoidingView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { fetchProfileRequest } from '../store/actions/profileAction';
import { CCTV } from '../assets/icon';
import { BLACK, GREY_TEXT, TEXT_COLOR, WHITE } from '../assets/colors';
import LinearGradient from 'react-native-linear-gradient';
import { POPPINS_BOLD } from '../assets/font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CreateUserModal from '../components/CreateUserModal';
import { fetchCreateUsersRequest } from '../store/actions/createUserAction';
import { fetchStockListRequest } from '../store/actions/stockListAction';
import { Tab } from 'react-native-elements';
const screenWidth = Dimensions.get('window').width;
const DashboardScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loadingProfile, dataProfile, errorProfile } = useSelector(state => state?.profile);
  const { loadingCreateUsers, dataCreateUsers, errorCreateUsers } = useSelector(state => state?.createUser);
  const { loadingStockList, dataStockList, errorStockList } = useSelector(state => state?.stockList);
  const [refreshing, setRefreshing] = useState(false);
  const [permissions, setpermissions] = useState('')
  const [isModalVisible, setModalVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const availableItems = dataStockList && dataStockList.filter(item => item.status === 'available');
  const rentedOutItems = dataStockList && dataStockList.filter(item => item.status === 'rented out');
  const outOfStockItems = dataStockList && dataStockList.filter(item => item.status === 'out of stock');


  const handleCreateUser = (userData) => {
    dispatch(fetchCreateUsersRequest(userData?.name, userData?.email, userData?.password, userData?.permissions?.canCreateTasks, userData?.permissions?.canEditTasks, userData?.permissions?.canCreateOrders, userData?.permissions?.canEditOrders, userData?.permissions?.canDeleteOrders, userData?.role))
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
      dispatch(fetchStockListRequest())
      const handleBackPress = () => {
        Alert.alert(
          'Exit App',
          'Do you want to exit?',
          [
            {
              text: 'No',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: () => BackHandler.exitApp(),
            },
          ],
          { cancelable: false }
        );
        return true; // Prevents the default back action
      };
      const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => {
        backHandler.remove();
      };
    }, [dispatch, navigation])
  );
  useEffect(() => {
    checkAuthPermission()
  }, [dataProfile])
  useEffect(() => { setModalVisible(false) }, [dataCreateUsers])
  const onRefresh = async () => {
    setRefreshing(true);
    dispatch(fetchProfileRequest())
    setRefreshing(false);
  };
  const renderContent = () => {
    switch (index) {
      case 0:
        return <Available />;
      case 1:
        return <RentedOut />;
      case 2:
        return <OutOfStock />;
      default:
        return null;
    }
  };
  const renderItem = ({ item }) => (

    <LinearGradient
      colors={['#4A6EFB', 'rgb(227 241 255)', '#4A6EFB']} // Gradient colors
      start={{ x: 3, y: -1 }} // Top-right corner
      end={{ x: -1.5, y: 3 }}
      style={styles.flatlistItem}>
      <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc', width: '100%' }} key={item?._id}>
        <Text>Name: {item.name}</Text>
        <Text>Brand: {item.brand}</Text>
        <Text>Type: {item.type}</Text>
      </View>
    </LinearGradient>
  );
  const Available = () => {
    if (loadingStockList) {
      return (<View style={[styles.mainContainer, { alignItems: 'center', justifyContent: 'center', top: 20 }]}><ActivityIndicator size="large" color="grey" /></View>)
    }

    return (
      <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        {availableItems && availableItems?.length > 0 ?
          <View style={{ width: '95%', alignItems: 'center', justifyContent: 'center' }}>
            <FlatList
              data={availableItems}
              renderItem={renderItem}
              scrollEnabled={false}
            />
          </View> : <View style={{ alignSelf: 'center', width: '100%', alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}><Text style={{
            fontSize: 20,
            color: 'red',
            fontFamily: POPPINS_BOLD,

          }}>{'Sorry, Not Available'}</Text></View>}
      </View>
    )
  }
  const RentedOut = () => {
    if (loadingStockList) {
      return (<View style={[styles.mainContainer, { alignItems: 'center', justifyContent: 'center', top: 20 }]}><ActivityIndicator size="large" color="grey" /></View>)
    }

    return (
      <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        {rentedOutItems && rentedOutItems?.length > 0 ?
          <View style={{ width: '95%', alignItems: 'center', justifyContent: 'center' }}>
            <FlatList
              data={rentedOutItems}
              renderItem={renderItem}
              scrollEnabled={false}
            />
          </View> : <View style={{ alignSelf: 'center', width: '100%', alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}><Text style={{
            fontSize: 20,
            color: 'red',
            fontFamily: POPPINS_BOLD,

          }}>{'Sorry, Not Available'}</Text></View>}
      </View>
    )
  }
  const OutOfStock = () => {
    if (loadingStockList) {
      return (<View style={[styles.mainContainer, { alignItems: 'center', justifyContent: 'center', top: 20 }]}><ActivityIndicator size="large" color="grey" /></View>)
    }

    return (
      <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        {outOfStockItems && outOfStockItems?.length > 0 ?
          <View style={{ width: '95%', alignItems: 'center', justifyContent: 'center' }}>
            <FlatList
              data={outOfStockItems}
              renderItem={renderItem}
              scrollEnabled={false}
            />
          </View> : <View style={{ alignSelf: 'center', width: '100%', alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}><Text style={{
            fontSize: 20,
            color: 'red',
            fontFamily: POPPINS_BOLD,

          }}>{'Sorry, Not Available'}</Text></View>}
      </View>
    )
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.mainContainer}>
        <Text style={styles.textStyle}>Welcome to the App!!</Text>
        <Image
          source={CCTV} // Replace with your API response
          style={{ width: screenWidth - 10, height: 200, borderRadius: 10, marginVertical: 10 }}
          resizeMode="cover"
        />
        {(permissions && permissions?.data?.permissions?.canCreateTasks) || permissions?.data?.role === 'admin' ? <LinearGradient
          colors={['#0636F3', '#F30635',]} // Gradient colors
          start={{ x: 0, y: 0 }}
          end={{ x: 1.5, y: 1.25 }}
          style={{ right: 0, borderRadius: 20, alignSelf: 'center', width: '40%', marginVertical: 20, alignItems: 'center', justifyContent: 'center', marginHorizontal: 10 }}>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={{ paddingVertical: 5 }} >
            <Text style={styles.okText}>Add Broker</Text>
          </TouchableOpacity>
        </LinearGradient> : null}
        <LinearGradient
          colors={['#0636F3', '#F30635',]} // Gradient colors
          start={{ x: 0, y: 0 }}
          end={{ x: 1.5, y: 1.25 }}
          style={{ right: 0, borderRadius: 20, alignSelf: 'center', width: '40%', marginVertical: 20, alignItems: 'center', justifyContent: 'center', marginHorizontal: 10 }}>
          <TouchableOpacity style={{ paddingVertical: 5 }} onPress={() => navigation?.navigate('AddItem')}>
            <Text style={styles.okText}>Add Item</Text>
          </TouchableOpacity>
        </LinearGradient>
        <View style={[styles.containerInner, { width: '100%' }]}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Tab
              value={index}
              onChange={setIndex}
              indicatorStyle={{ display: 'none' }}
            // variant="default"
            >
              <Tab.Item
                title='Available'
                titleStyle={index === 0 ? styles.activeTitle : styles.inactiveTitle}
                containerStyle={styles.tabContainer}
              />
              <Tab.Item
                title="Rented Out"
                titleStyle={index === 1 ? styles.activeTitle : styles.inactiveTitle}
                containerStyle={styles.tabContainer}
              />
              <Tab.Item
                title="Out of Stock"
                titleStyle={index === 2 ? styles.activeTitle : styles.inactiveTitle}
                containerStyle={styles.tabContainer}
              />

            </Tab>
          </ScrollView>
        </View>
        <View style={styles.tabContent}>
          {renderContent()}

        </View>
       
        <CreateUserModal
          visible={isModalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={handleCreateUser}
          data={''}
        />
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    paddingBottom: 20
  },
  textStyle: {
    color: BLACK,
    fontSize: 20,
    fontWeight: '700',
    paddingVertical: 20
  },
  okText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: POPPINS_BOLD
  },
  containerInner: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTitle: {
    color: TEXT_COLOR,
    textTransform: 'none', // Ensures text is not capitalized
    borderBottomWidth: 1,
    borderColor: TEXT_COLOR,
    fontFamily: POPPINS_BOLD,
    fontSize: 14
  },
  inactiveTitle: {
    color: GREY_TEXT,
    textTransform: 'none', // Ensures text is not capitalized
    borderBottomWidth: 1,
    borderColor: GREY_TEXT,
    fontFamily: POPPINS_BOLD,
    fontSize: 14
  },
  tabContainer: {
    backgroundColor: 'transparent', // Remove background color
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  flatlistItem: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: WHITE,
    padding: 10,
    marginVertical: 10
  },
});

export default DashboardScreen;
