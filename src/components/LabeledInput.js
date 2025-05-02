// LabeledInput.js
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { BLACK, GREY, PLACEHOLDER_COLOR, WHITE } from '../assets/colors';
import { POPPINS_MEDIUM, POPPINS_SEMIBOLD } from '../assets/font';
import { useState } from 'react';
import { Image } from 'react-native';
import { SHOW_ICON } from '../assets/icon';
import { TouchableOpacity } from 'react-native';

const LabeledInput = ({ label, placeholder, style, onChangeText, errorText, value, textStyle, keyboardType, maxLength, secureTextEntry, ...props }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <View style={[styles.container, style]}>
      <View style={styles.txtContainer}><Text style={styles.label}>{label}<Text style={styles.asterisk}>*</Text></Text></View>
      <View style={styles.inputContainer}><TextInput
        placeholder={placeholder}
        style={[styles.input, textStyle]}
        placeholderTextColor={'black'}
        onChangeText={onChangeText}
        value={value}
        maxLength={maxLength}
        keyboardType={keyboardType}
        secureTextEntry={!isPasswordVisible}
        {...props}
      />
      {secureTextEntry && (
        <TouchableOpacity style={styles.iconContainer} onPress={togglePasswordVisibility}>
          <Image
            source={SHOW_ICON}
            style={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>
      )}</View>
      {errorText && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    color: BLACK,
    fontFamily: POPPINS_SEMIBOLD,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: GREY,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: WHITE,
  },
  input: {
    flex: 1,
    padding: 10,
    fontFamily: POPPINS_MEDIUM,
    color:PLACEHOLDER_COLOR
  },
  iconContainer: {
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 5,
    fontFamily: POPPINS_MEDIUM,
  },
  txtContainer: {
    position: 'relative',
    paddingRight: 10, // Optional, to provide space for the asterisk
  },
  asterisk: {
    position: 'absolute',
    top: 0,
    right: 0,
    color: 'red', // or any color you prefer
    fontSize: 16, // Match the font size with label
    fontFamily: POPPINS_MEDIUM,
  },
});

export default LabeledInput;
