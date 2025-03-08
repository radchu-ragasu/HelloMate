import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

// Assuming you have a types.ts file with your UserType enum
enum UserType {
  BusinessOwner = 'businessOwner',
  ServiceProvider = 'serviceProvider',
  Customer = 'customer',
}

const CreateAccountScreen = () => {
  const router = useRouter();
  const [userType, setUserType] = useState<UserType | null>(null);

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
    switch (type) {
      case UserType.BusinessOwner:
        router.push('/BusinessOwnerSignup');
        break;
      case UserType.ServiceProvider:
        router.push('/ServiceProviderSignup');
        break;
      case UserType.Customer:
        router.push('/CustomerSignup');
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.label}>I am a...</Text>

      <TouchableOpacity
        style={[styles.button, userType === UserType.BusinessOwner && styles.selectedButton]}
        onPress={() => handleUserTypeSelect(UserType.BusinessOwner)}
      >
        <Text style={styles.buttonText}>Business Owner</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, userType === UserType.ServiceProvider && styles.selectedButton]}
        onPress={() => handleUserTypeSelect(UserType.ServiceProvider)}
      >
        <Text style={styles.buttonText}>Service Provider</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, userType === UserType.Customer && styles.selectedButton]}
        onPress={() => handleUserTypeSelect(UserType.Customer)}
      >
        <Text style={styles.buttonText}>Customer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#ADD8E6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
    minWidth: 200,
    alignItems: 'center',
    elevation: 5, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  selectedButton: {
    backgroundColor: '#87CEFA',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateAccountScreen;

