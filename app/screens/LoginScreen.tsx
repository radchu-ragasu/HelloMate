import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/ui/button';
import { TextInput } from '../components/ui/text-input';
import { Card } from '../components/ui/card';
import { Alert } from '../components/ui/alert';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

type UserRole = 'business' | 'provider' | 'customer' | '';
type AuthMethod = 'google' | 'email' | 'phone' | '';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [userRole, setUserRole] = useState<UserRole>('');
  const [authMethod, setAuthMethod] = useState<AuthMethod>('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    setError('');
  };

  const handleAuthMethodSelect = (method: AuthMethod) => {
    setAuthMethod(method);
    setError('');
  };

  const handleGoogleAuth = async () => {
    try {
      // Implement Google authentication logic here
      console.log('Google auth initiated');
    } catch (error) {
      setError('Google authentication failed');
    }
  };

  const handleSubmit = async () => {
    if (!userRole) {
      setError('Please select a user role');
      return;
    }
    if (!authMethod) {
      setError('Please select an authentication method');
      return;
    }

    try {
      // Implement authentication logic based on selected method
      console.log('Login attempted:', { userRole, authMethod, email, phone });
      // Navigate to Dashboard on success
      // navigation.navigate('Dashboard');
    } catch (error) {
      setError('Authentication failed');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Card style={styles.card}>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.description}>
            Please select your role and preferred login method
          </Text>

          {/* Role Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>I am a:</Text>
            <View style={styles.roleButtons}>
              <Button
                onPress={() => handleRoleSelect('business')}
                variant={userRole === 'business' ? 'filled' : 'outlined'}
                style={styles.roleButton}
              >
                Business Owner
              </Button>
              <Button
                onPress={() => handleRoleSelect('provider')}
                variant={userRole === 'provider' ? 'filled' : 'outlined'}
                style={styles.roleButton}
              >
                Service Provider
              </Button>
              <Button
                onPress={() => handleRoleSelect('customer')}
                variant={userRole === 'customer' ? 'filled' : 'outlined'}
                style={styles.roleButton}
              >
                Customer
              </Button>
            </View>
          </View>

          {/* Authentication Method Selection */}
          {userRole && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Login with:</Text>
              <View style={styles.authButtons}>
                <Button
                  onPress={() => handleAuthMethodSelect('google')}
                  variant="outlined"
                  style={styles.authButton}
                  icon={<Ionicons name="logo-google" size={20} color="#666" />}
                >
                  Continue with Google
                </Button>
                
                <Button
                  onPress={() => handleAuthMethodSelect('email')}
                  variant="outlined"
                  style={styles.authButton}
                  icon={<Ionicons name="mail" size={20} color="#666" />}
                >
                  Continue with Email
                </Button>
                
                <Button
                  onPress={() => handleAuthMethodSelect('phone')}
                  variant="outlined"
                  style={styles.authButton}
                  icon={<Ionicons name="phone-portrait" size={20} color="#666" />}
                >
                  Continue with Phone
                </Button>
              </View>
            </View>
          )}

          {/* Email Input */}
          {authMethod === 'email' && (
            <View style={styles.section}>
              <TextInput
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Button onPress={handleSubmit} style={styles.submitButton}>
                Continue
              </Button>
            </View>
          )}

          {/* Phone Input */}
          {authMethod === 'phone' && (
            <View style={styles.section}>
              <TextInput
                placeholder="Enter your phone number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
              <Button onPress={handleSubmit} style={styles.submitButton}>
                Continue
              </Button>
            </View>
          )}

          {/* Error Message */}
          {error && (
            <Alert variant="error" style={styles.alert}>
              {error}
            </Alert>
          )}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'center',
  },
  card: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: 'white',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  roleButtons: {
    gap: 8,
  },
  roleButton: {
    marginBottom: 8,
  },
  authButtons: {
    gap: 8,
  },
  authButton: {
    marginBottom: 8,
  },
  submitButton: {
    marginTop: 12,
  },
  alert: {
    marginTop: 12,
  },
});

export default LoginScreen;