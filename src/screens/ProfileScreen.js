// ProfileScreen.js
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Switch, TextInput } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileRequest } from '../store/actions/profileAction';
import { BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { POPPINS_BOLD, POPPINS_MEDIUM, POPPINS_REGULAR } from '../assets/font';
import { RefreshControl } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loadingProfile, dataProfile, errorProfile } = useSelector(state => state?.profile);
  const [refreshing, setRefreshing] = useState(false);

const formatDateMonth = (dateString) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day < 10 ? '0' + day : day}-${month}-${year}`;
};
  useEffect(() => {
   
    dispatch(fetchProfileRequest());
    const backAction = () => {
      navigation.navigate('Dashboard'); // Go to the previous screen
      return true; // Prevent default behavior
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [dispatch, navigation, ]);
  const onRefresh = async () => {
    setRefreshing(true);
    // Call your API or data fetching logic here
    await dispatch(fetchProfileRequest());
    setRefreshing(false);
  };
 
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
    <ScrollView refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      <View style={styles.container}>
        
        {dataProfile && dataProfile?.data ? <View style={styles.profileSectionView}>
          <View style={styles.innerSectionProfile}>
            <View style={styles.avatarView}></View>
            <View style={styles.profileHeader}>
              <View style={styles.avtarText}>
                <Text style={styles.avtarTextStyle}>DE</Text>
              </View>
            </View>
            <View style={styles.infoDataContainer}>
              <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Name:</Text>
                <Text style={styles.infoText}>{dataProfile?.data?.name}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Email:</Text>
                <Text style={styles.infoText}>{dataProfile?.data?.email}</Text>
              </View>
              
            </View>
          </View>
        </View> : <View style={{ width: '90%', justifyContent: 'center', alignItems: 'center' }}><Text style={{
          fontSize: 20,
          color: 'red',
          fontFamily: POPPINS_BOLD,
          alignSelf: 'center',
          paddingVertical:250
        }}>Sorry, No Profile data found</Text></View>}
      </View>
    </ScrollView>
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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgb(243 244 246)',
  },
  profileStyle: {
    width: '100%',
    alignItems: 'flex-start'
  },
  profileText: {
    fontSize: 20,
    fontWeight: 'bold', color: 'black'

  },
  dividerLine: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: 'rgb(238 239 242)',
    paddingTop: 10
  },
  profileSectionView: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Android shadow
    elevation: 5,
  },
  innerSectionProfile: {
    width: '90%',
    borderRadius: 5,
    backgroundColor: '#fff',
    borderColor: 'rgb(238 239 242)',
    borderWidth: 1,
    marginVertical: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarView: {
    width: '100%',
    padding: 40,
    backgroundColor: 'rgb(255 201 254)'
  },
  profileHeader: {
    position: 'absolute',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 100,
    top: 40
  },
  avtarText: {
    backgroundColor: '#e3e3e3',
    borderRadius: 100,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avtarTextStyle: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  infoDataContainer: {
    marginTop: 45,
    width: '100%',
    padding: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 5,
  },
  infoLabel: {
    padding: 5, color: 'black', fontFamily: POPPINS_MEDIUM
  },
  infoText: {
    padding: 5, fontFamily: POPPINS_BOLD,
    fontSize: 15,
    width: '70%', color: 'black'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginBottom: 30
  },
  button: {
    backgroundColor: 'rgb(243 0 239)',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomSheetContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetTitle: {
    fontSize: 24,
    fontFamily: POPPINS_REGULAR,
    marginBottom: 20,
    color: 'black'
  },
  input: {
    borderColor: 'rgb(161 161 161)',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 20,
  },
  sheetButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    padding: 30
  },
  sheetButton: {
    backgroundColor: '#e91e63',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  sheetButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  textStyle: {
    width: '90%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E9E9E9',
    flexDirection: 'row', justifyContent: 'space-between',
    marginTop: 10
  },

});

export default ProfileScreen;
