import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OrderDetailScreen from "./order details/OrderScreen4"


const Stack = createStackNavigator();
//navigator 
const StackNavigator = () => {
  return (
      <Stack.Navigator initialRouteName="OrderScreen">
      <Stack.Screen 
          name="OrderScreen" 
          component={OrderDetailScreen} 
          options={{ title: "Order Detail" }} 
        />
        </Stack.Navigator>
  );
};
const App = () => {
  return (
    <NavigationContainer>
      {/* ✅ Using the StackNavigator function here */}
      <StackNavigator />
    </NavigationContainer>
  );
};
export default App;