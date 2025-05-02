// CustomInput.js
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { TEXT_COLOR } from '../assets/colors';
import { POPPINS_MEDIUM, POPPINS_SEMIBOLD } from '../assets/font';
import { CROSS } from '../assets/icon';

const CustomInput = ({
    inputName,
    placeholder,
    secureTextEntry,
    leftIcon,
    rightIcon,
    onRightIconPress,
    style,
    mainStyle,
    imgStyle,
    isText,
    onChangeText,
    keyboardType,
    maxLength,
    onCross,
    crossIcon,
    append,
    inputValue,
    leftIconStyle,
    ...props
}) => {
    const [isSecure, setIsSecure] = useState(secureTextEntry);
    // const [inputValue, setInputValue] = useState('');

    const handleToggleSecure = () => {
        setIsSecure(!isSecure);
    };
    const handleInputChange = (text) => {
        // setInputValue(text);
        if (onChangeText) {
            onChangeText(text);
        }
    };
    return (
        <View style={[styles.mainContainer, mainStyle]}>
            <Text style={styles.inputText} numberOfLines={1}>{inputName}</Text>
            <View style={[styles.container, style]}>
                {leftIcon && (
                    <View style={styles.iconLeft}>
                        <Image source={leftIcon} style={[styles.iconImage, leftIconStyle]} />
                    </View>
                )}
                {isText ? <Text numberOfLines={1} style={styles.input}>{placeholder}</Text> :
                    <TextInput
                        style={styles.input}
                        placeholder={placeholder}
                        secureTextEntry={isSecure}
                        value={inputValue}
                        onChangeText={handleInputChange}
                        keyboardType={keyboardType}
                        maxLength={maxLength}
                        {...props}
                        placeholderTextColor={'black'}
                    />}

                {rightIcon && (
                    <View style={styles.iconRight}>
                       {crossIcon && <TouchableOpacity onPress={onCross}><Image source={CROSS} style={styles.iconImageCross} /></TouchableOpacity>}
                        <TouchableOpacity onPress={onRightIconPress || handleToggleSecure}><Image source={rightIcon} style={[styles.iconImage, imgStyle]} tintColor={'#1E49F5'}/></TouchableOpacity>
                    </View>
                )}
            </View>
            {/* <View style={[styles.container, style]}>
                    {leftIcon && (
                        <View style={styles.iconLeft}>
                            <Image source={leftIcon} style={styles.iconImage} />
                        </View>
                    )}
                    {isText ? <Text numberOfLines={1} style={styles.input}>{placeholder}</Text> :
                        <TextInput
                            style={styles.input}
                            placeholder={placeholder}
                            secureTextEntry={isSecure}
                            value={inputValue}
                            onChangeText={handleInputChange}
                            keyboardType={keyboardType}
                            maxLength={maxLength}
                            {...props}
                            placeholderTextColor={'black'}
                        />}
                    {rightIcon && (
                        <View style={styles.iconRight}>
                            <Image source={rightIcon} style={[styles.iconImage, imgStyle]} />
                        </View>
                    )}
                </View>} */}
        </View>

    );
};

const styles = StyleSheet.create({
    mainContainer: {
        width: '90%',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgb(161 161 161)',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        padding: 5,
        color: TEXT_COLOR,
        fontFamily: POPPINS_MEDIUM
    },
    inputText: {
        paddingVertical: 10,
        color: TEXT_COLOR,
        fontFamily: POPPINS_SEMIBOLD
    },
    iconLeft: {
        paddingRight: 10,
    },
    iconRight: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    iconImage: {
        width: 24,
        height: 24,
    },
    iconImageCross: {
        width: 14,
        height: 14,
        paddingRight: 5
    },
});

export default CustomInput;
