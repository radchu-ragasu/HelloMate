import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import OrderScreen6 from '../order details/OrderScreen6'; 
import HomeScreen from '../order details/HomeScreen'; 

export type RootStackParamList = {
  OrderScreen6: { orderData: OrderData };
  Home: undefined;
};

export type OrderData = {
  id: string;
  status: string;
  address: string;
  serviceType: string;
  orderDate: string;
  details: string;
  attachments?: string[];
};

const Stack = createStackNavigator<RootStackParamList>();

const MainStack = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="OrderScreen6" component={OrderScreen6} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen 
          name="OrderScreen6" 
          component={OrderScreen6} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
