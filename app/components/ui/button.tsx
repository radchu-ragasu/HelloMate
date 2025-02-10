import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  variant?: 'filled' | 'outlined';
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'filled',
  style,
  textStyle,
  icon,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'outlined' ? styles.outlinedButton : styles.filledButton,
        style,
      ]}
      {...props}
    >
      {icon && <Text style={styles.icon}>{icon}</Text>}
      <Text
        style={[
          styles.text,
          variant === 'outlined' ? styles.outlinedText : styles.filledText,
          textStyle,
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    minHeight: 48,
  },
  filledButton: {
    backgroundColor: '#007AFF',
    borderWidth: 0,
  },
  outlinedButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  filledText: {
    color: '#FFFFFF',
  },
  outlinedText: {
    color: '#007AFF',
  },
  icon: {
    marginRight: 8,
  },
});