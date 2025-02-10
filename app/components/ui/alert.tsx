import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AlertProps {
  children: React.ReactNode;
  variant?: 'error' | 'success' | 'warning' | 'info';
  style?: ViewStyle;
}

export const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'info',
  style,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'error':
        return {
          container: styles.errorContainer,
          icon: 'alert-circle',
          iconColor: '#DC2626',
        };
      case 'success':
        return {
          container: styles.successContainer,
          icon: 'checkmark-circle',
          iconColor: '#059669',
        };
      case 'warning':
        return {
          container: styles.warningContainer,
          icon: 'warning',
          iconColor: '#D97706',
        };
      default:
        return {
          container: styles.infoContainer,
          icon: 'information-circle',
          iconColor: '#2563EB',
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <View style={[styles.container, variantStyles.container, style]}>
      <Ionicons
        name={variantStyles.icon as any}
        size={20}
        color={variantStyles.iconColor}
        style={styles.icon}
      />
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  errorContainer: {
    backgroundColor: '#FEE2E2',
  },
  successContainer: {
    backgroundColor: '#D1FAE5',
  },
  warningContainer: {
    backgroundColor: '#FEF3C7',
  },
  infoContainer: {
    backgroundColor: '#DBEAFE',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
  },
});