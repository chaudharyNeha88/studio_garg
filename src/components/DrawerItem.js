import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { DASHBOARD_ICON, EDIT, LOGOUT_ICON, PROFILE_ICON, TICKET_ICON } from '../assets/icon';
import { WHITE } from '../assets/colors';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileRequest } from '../store/actions/profileAction';


function CustomDrawerContent(props) {
  const dispatch = useDispatch()
  const { loadingProfile, dataProfile, errorProfile } = useSelector(state => state?.profile);
  const navigation = useNavigation();
  const [permissions, setpermissions] = useState('')
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
  useEffect(() => {
    dispatch(fetchProfileRequest())
    checkAuthPermission();
  }, [navigation, dataProfile]);


  const handleLogout = async () => {
    try {
      // Clear all data from AsyncStorage
      await AsyncStorage.clear();

      // Navigate the user to the login screen or any other screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }], // Replace 'LoginScreen' with your login screen name
      });
      // navigation?.navigate('Login')
    } catch (error) {
      console.error('Error clearing local storage on logout:', error);
    }
  };
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      {/* Drawer Items */}
      <View style={{ flex: 1 }}>
        <DrawerItem
          label="Dashboard"
          icon={({ color, size }) => <Image source={DASHBOARD_ICON} style={{ width: 18, height: 18, marginRight: 10, tintColor: 'black' }} tintColor={color} />}
          onPress={() => props.navigation.navigate('Dashboard')}
        />
        <DrawerItem
          label="Order List"
          icon={({ color, size }) => <Image source={TICKET_ICON} style={{ width: 18, height: 18, marginRight: 10, tintColor: 'black' }} tintColor={color} />}
          onPress={() => props.navigation.navigate('ProductList')}
        />
        <DrawerItem
          label="Create Order"
          icon={({ color, size }) => <Image source={EDIT} style={{ width: 18, height: 18, marginRight: 10, tintColor: 'black' }} tintColor={color} />}
          onPress={() => props.navigation.navigate('AddItem')}
        />
        <DrawerItem
          label="Stock List"
          icon={({ color, size }) => <Image source={TICKET_ICON} style={{ width: 18, height: 18, marginRight: 10, tintColor: 'black' }} tintColor={color} />}
          onPress={() => props.navigation.navigate('StockList')}
        />
        <DrawerItem
          label="Add Stock"
          icon={({ color, size }) => <Image source={EDIT} style={{ width: 18, height: 18, marginRight: 10, tintColor: 'black' }} tintColor={color} />}
          onPress={() => props.navigation.navigate('AddStock')}
        />
        <DrawerItem
          label="Profile"
          icon={({ color, size }) => <Image source={PROFILE_ICON} style={{ width: 18, height: 18, marginRight: 10, tintColor: 'black' }} tintColor={color} />}
          onPress={() => props.navigation.navigate('ProfileScreen')}
        />
        {(permissions && permissions?.data?.permissions?.canCreateTasks) || permissions?.data?.role === 'admin' ? <DrawerItem
          label="All Users"
          icon={({ color, size }) => <Image source={PROFILE_ICON} style={{ width: 18, height: 18, marginRight: 10, tintColor: 'black' }} tintColor={color} />}
          onPress={() => props.navigation.navigate('AllUsers')}
        /> : null}
      </View>

      {/* Logout Button at Bottom */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={() => handleLogout()}>
          <Image source={LOGOUT_ICON} style={{ width: 18, height: 18, marginRight: 10, tintColor: WHITE }} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  itemTitle: {
    fontSize: 16,
  },
  subItemsContainer: {
    paddingLeft: 16,
  },
  subItem: {
    paddingVertical: 8,
  },
  logoutContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d9534f',
    padding: 12,
    borderRadius: 8,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default CustomDrawerContent;
