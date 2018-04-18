import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'stretch',
    margin: 40,
  },
  button: {
    padding: 20,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
});

const TextButton = ({ message, messageStyle={}, defaultColor, onPress, disabled, disabledColor}) => (
  <View style={styles.container}>
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, {backgroundColor: disabled ? disabledColor : defaultColor}]}
    >
      <Text style={[styles.buttonText, messageStyle]}> {message} </Text>
    </TouchableOpacity>
  </View>
);

export default TextButton;
