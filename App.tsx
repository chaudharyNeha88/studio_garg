
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { BackHandler, StyleSheet } from 'react-native';
import { useRef } from 'react';
import { ROYAL_BLUE, WHITE } from './src/assets/colors';
import { View } from 'react-native';
import { Image } from 'react-native';
import ProductList from './src/screens/ProductList';
import AddItem from './src/screens/AddItem';
import { createDrawerNavigator} from '@react-navigation/drawer';
import { DASHBOARD_ICON } from './src/assets/icon';
import AllUsers from './src/screens/AllUsers';
import CustomDrawerContent from './src/components/DrawerItem';
import ListView from './src/screens/ListView';
import CreateStockScreen from './src/screens/CreateStockScreen';
import StockList from './src/screens/StockList';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: 'white', // Text color for active screen
        drawerInactiveTintColor: '#888', // Text color for inactive screens
        drawerActiveBackgroundColor: ROYAL_BLUE, // Background for active screen
        drawerInactiveBackgroundColor: 'transparent', // No background for inactive screens
        drawerStyle: { backgroundColor: '#f8f9fa', width: 250 }, // Overall drawer background
        drawerLabelStyle: { fontSize: 16, fontFamily: 'Poppins-SemiBold' }, // Font styling
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          drawerIcon: ({ color, size }) => <Image source={DASHBOARD_ICON} style={{ width: 18, height: 18, marginRight: 10, tintColor: 'black' }} tintColor={color} />,
          headerStyle: { backgroundColor: ROYAL_BLUE },
          headerTintColor: 'white',
        }}
      />
      <Drawer.Screen
        name="ProductList"
        component={ProductList}
        options={{
          drawerIcon: ({ color, size }) => <Image source={DASHBOARD_ICON} style={{ width: 18, height: 18, marginRight: 10, tintColor: 'black' }} tintColor={color} />,
          headerStyle: { backgroundColor: ROYAL_BLUE },
          headerTintColor: 'white',
        }}
      />
      <Drawer.Screen
        name="AddItem"
        component={AddItem}
        options={{
          drawerIcon: ({ color, size }) => <Image source={DASHBOARD_ICON} style={{ width: 18, height: 18, marginRight: 10, tintColor: 'black' }} tintColor={color} />,
          headerStyle: { backgroundColor: ROYAL_BLUE },
          headerTintColor: 'white',
        }}
      />
      <Drawer.Screen
        name="AddStock"
        component={CreateStockScreen}
        options={{
          drawerIcon: ({ color, size }) => <Image source={DASHBOARD_ICON} style={{ width: 18, height: 18, marginRight: 10, tintColor: 'black' }} tintColor={color} />,
          headerStyle: { backgroundColor: ROYAL_BLUE },
          headerTintColor: 'white',
        }}
      />
      <Drawer.Screen
        name="StockList"
        component={StockList}
        options={{
          drawerIcon: ({ color, size }) => <Image source={DASHBOARD_ICON} style={{ width: 18, height: 18, marginRight: 10, tintColor: 'black' }} tintColor={color} />,
          headerStyle: { backgroundColor: ROYAL_BLUE },
          headerTintColor: 'white',
        }}
      />
      <Drawer.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color, size }) => <Image source={DASHBOARD_ICON} style={{ width: 18, height: 18, marginRight: 10, tintColor: 'black' }} tintColor={color} />,
          headerStyle: { backgroundColor: ROYAL_BLUE },
          headerTintColor: 'white',
        }}
      />
      <Drawer.Screen
        name="AllUsers"
        component={AllUsers}
        options={{
          drawerIcon: ({ color, size }) => <Image source={DASHBOARD_ICON} style={{ width: 18, height: 18, marginRight: 10, tintColor: 'black' }} tintColor={color} />,
          headerStyle: { backgroundColor: ROYAL_BLUE },
          headerTintColor: 'white',
        }}
      />
    </Drawer.Navigator>
  );
}

function App() {
  const navigationRef = useRef()
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuthState = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setIsCheckingAuth(false);
    } catch (error) {
      setIsCheckingAuth(false);
    }
  };
  useEffect(() => {
    const handleBackPress = () => {
      BackHandler.exitApp()
      return true; // Prevents the default back action
    };

    checkAuthState();

    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      backHandler.remove();
    };
  }, []);

  if (isCheckingAuth) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Image
          source={require('./src/assets/splash_background.png')} // Replace with your PNG image path
          style={{
            width: 300, // Set the image width
            height: 300, resizeMode: 'contain'
          }}
        />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName={isLoggedIn ? 'DrawerNavigator' : 'Login'}>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false, }} />
          <Stack.Screen name="ListView" component={ListView} options={() => ({
            title: 'Detail',
            headerTitleStyle: {
              fontSize: 20, // Change the font size
              fontFamily: 'Poppins-SemiBold', // Change the font family
              color: WHITE, // Change the font color
            },
            headerStyle: {
              backgroundColor: ROYAL_BLUE
            },
            headerTintColor: WHITE,
          })}  />
          <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} options={{ headerShown: false, }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
const styles = StyleSheet.create({
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