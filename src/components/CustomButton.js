// CustomButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { BUTTON_COLOR, WHITE } from '../assets/colors';
import { POPPINS_REGULAR } from '../assets/font';

const CustomButton = ({ title, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '48%',
    backgroundColor: BUTTON_COLOR,
    borderRadius: 8,
    alignItems: 'center',
    padding: 8,
  },
  buttonText: {
    // fontSize: 21,
    color: WHITE,
    fontFamily:POPPINS_REGULAR
  },
});

export default CustomButton;
