import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, OrderData } from '../navigation/Navigator';

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const sampleOrder: OrderData = {
  id: '12345',
  status: 'Pending',
  address: '123 Main Street, New York',
  serviceType: 'Cleaning',
  orderDate: 'March 17, 2025',
  details: 'Deep house cleaning needed',
  attachments: ['https://via.placeholder.com/100', 'https://via.placeholder.com/100'],
};

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('OrderScreen6', { orderData: sampleOrder })}>
        <Text style={styles.buttonText}>Go to Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  button: { backgroundColor: '#3498db', padding: 10, marginTop: 20, borderRadius: 5 },
  buttonText: { color: 'white', fontWeight: 'bold' },
});

export default HomeScreen;
