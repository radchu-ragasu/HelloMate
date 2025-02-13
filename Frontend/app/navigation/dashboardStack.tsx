import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "../screens/Dashboard";
import MenuScreen from "../screens/MenuScreen";

const Stack = createStackNavigator();

const DashboardStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DashboardMain" component={Dashboard} />
      <Stack.Screen name="MenuScreen" component={MenuScreen} />
    </Stack.Navigator>
  );
};

export default DashboardStack;
