import React from 'react';
import {
  TextInput as RNTextInput,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
  View,
} from 'react-native';

interface CustomTextInputProps extends TextInputProps {
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}

export const TextInput: React.FC<CustomTextInputProps> = ({
  containerStyle,
  inputStyle,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <RNTextInput
        style={[styles.input, inputStyle]}
        placeholderTextColor="#999"
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    color: '#000000',
  },
});