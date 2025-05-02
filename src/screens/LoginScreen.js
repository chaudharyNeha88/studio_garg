import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import LabeledInput from '../components/LabeledInput';
import LogoIcon from '../assets/splash_background.png'
import { loginRequest } from '../store/actions/authActions';
import { useDispatch, useSelector, } from 'react-redux';
import { BLACK, BUTTON_COLOR, DARK_PURPLE, GREY, LIGHT_PURPLE, PURPLE, WHITE } from '../assets/colors.js'
import { POPPINS_BOLD, POPPINS_MEDIUM, POPPINS_REGULAR } from '../assets/font.js'
import { TouchableOpacity } from 'react-native';
import { ActivityIndicator } from 'react-native';
const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loginLoader } = useSelector(state => state?.auth)
  const [username, setUsername] = useState('');
  const [userNameError, setUserNameError] = useState('')
  const [password, setPassword] = useState('');
  const [passwordError, setErrorPassword] = useState('')

  const handleLogin = () => {
    // Handle the login logic
    if (username === '' && password === '') {
      setUserNameError('Please enter your Login ID')
      setErrorPassword('Please enter your Password')
    } else if (username === '') {
      setUserNameError('Please enter your Login ID')
    } else if (password === '') {
      setErrorPassword('Please enter your Password')
    }  else {
      dispatch(loginRequest({ login_id: username, password }, navigation));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to</Text>
      <View style={{ width: '100%', alignItems: 'center' }}>
        <Image
          style={styles.logo}
          source={LogoIcon}
        />
      </View>
      <View style={styles.note}>
        <Text style={styles.noteText}>Please Use Your Login Id and Password to Get Access</Text>
      </View>
      <LabeledInput
        value={username}
        label="Login Id"
        placeholder="Enter your login id..."
        style={styles.labeledInput}
        textStyle={{ borderColor: userNameError ? 'red' : GREY, color: 'black' }}
        onChangeText={(text) => { setUsername(text), setUserNameError('') }}
        errorText={userNameError}
      />

      <LabeledInput
        value={password}
        label="Password"
        placeholder="Enter your password..."
        style={[styles.labeledInput, { marginTop: 20 }]}
        textStyle={{ borderColor: passwordError ? 'red' : GREY, color: 'black' }}
        onChangeText={(text) => { setPassword(text), setErrorPassword('') }}
        errorText={passwordError}
        secureTextEntry
      />

      <View style={styles.btnView}>
        <TouchableOpacity style={styles.customButtonLogin} onPress={handleLogin}>
          {loginLoader ? <ActivityIndicator size="large" color={WHITE} /> : <Text style={styles.buttonText}>{'Login Now'}</Text>}
        </TouchableOpacity>
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9'
  },
  title: {
    fontSize: 32,
    color: BLACK,
    fontFamily: POPPINS_BOLD
  },
  logo: {
    height: 40,
    marginBottom: 25,
    width: 250
  },
  labeledInput: {
    marginTop: 30,
    color: 'black'
  },
  customButton: {
    marginBottom: 20, // Example style, adjust as needed
  },
  customButtonLogin: {
    // width: '35%'
    padding: 8,
    borderRadius: 8,
    width: '48%',
    backgroundColor: BUTTON_COLOR,
    alignItems: 'center',
  },
  note: {
    width: '85%',
    backgroundColor: LIGHT_PURPLE,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: PURPLE,
    alignItems: 'center',
    justifyContent: 'center'
  },
  noteText: {
    fontSize: 15,
    color: DARK_PURPLE,
    padding: 9,
    fontFamily: POPPINS_MEDIUM,
    textAlign: 'center',
  },
  btnView: {
    justifyContent: 'center',
    width: '90%',
    marginTop: 20,
    alignItems: 'center'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%'
  },
  checkbox: {
    alignSelf: 'center',
    color: 'black'
  },
  label: {
    margin: 8,
    color: BLACK,
    fontFamily: POPPINS_REGULAR,
    fontSize: 13
  },
  ResetButton: {
    width: '90%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 10,

  }, buttonText: {
    fontSize: 21,
    color: WHITE,
    fontFamily: POPPINS_REGULAR
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginTop: 20,
},
closeText: {
    color: 'blue',
    fontSize: 16,
},
modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
contentContainer: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 10,
},
});

export default LoginScreen;
