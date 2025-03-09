import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CategoriesScreen from '../screens/CategoriesScreen'; // Adjust the import path as needed
import OrderFormScreen from '../screens/OrderFormScreen'; // Adjust the import path as needed

// Define the RootStackParamList to pass to the stack navigator
type RootStackParamList = {
  Categories: undefined;
  OrderForm: { category: { name: string } };
};

const Stack = createStackNavigator<RootStackParamList>();

function PlaceOrderStack() {
  return (
    <Stack.Navigator>
    <Stack.Screen name="Categories" component={CategoriesScreen} />
    <Stack.Screen name="OrderForm" component={OrderFormScreen} />
    </Stack.Navigator>
  );
}

export default PlaceOrderStack;
