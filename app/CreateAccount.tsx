import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { UserType } from './types'; 
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
        style={[styles.button, userType === 'businessOwner' && styles.selectedButton]}
        onPress={() => handleUserTypeSelect(UserType.BusinessOwner)} // Pass enum value
      >
        <Text style={styles.buttonText}>Business Owner</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, userType === 'serviceProvider' && styles.selectedButton]}
        onPress={() => handleUserTypeSelect(UserType.ServiceProvider)} // Pass enum value
      >
        <Text style={styles.buttonText}>Service Provider</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, userType === 'customer' && styles.selectedButton]}
        onPress={() => handleUserTypeSelect(UserType.Customer)} // Pass enum value
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