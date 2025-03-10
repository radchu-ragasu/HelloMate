import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountTypeSelection = () => {
  const router = useRouter();

  const handleSelection = async (accountType: string) => {
    try {
      // Store the selected account type in AsyncStorage temporarily
      // This will be accessed by the signup form later
      await AsyncStorage.setItem('selectedAccountType', accountType);
      
      // Navigate to the appropriate signup form based on selection
      switch (accountType) {
        case "businessOwner":
          router.push("/BusinessOwnerSignup");
          break;
        case "serviceProvider":
          router.push("/ServiceProviderSignup");
          break;
        case "customer":
          router.push("/CustomerSignup");
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error storing account type:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Create Account</Text>
        
        <Text style={styles.subtitle}>I am a...</Text>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => handleSelection("businessOwner")}
        >
          <Text style={styles.buttonText}>Business Owner</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => handleSelection("serviceProvider")}
        >
          <Text style={styles.buttonText}>Service Provider</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => handleSelection("customer")}
        >
          <Text style={styles.buttonText}>Customer</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#333",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
    marginBottom: 24,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#a8dadc",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 24,
    width: "80%",
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default AccountTypeSelection;