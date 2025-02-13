import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FlexBoxComponent from "../screens/MenuScreen";
import Dashboard from "../screens/Dashboard";
import ProfileScreen from "../screens/ProfileScreen";
import ContactScreen from "../screens/ContactScreen";
import WorkerScreen from "../screens/WorkerScreen";
import RegCompScreen from "../screens/RegCompScreen";
import NotificationsScreen from "../screens/NotificationScreen";
import HelpScreen from "../screens/HelpScreen";
import SettingsScreen from "../screens/SettingsScreen";
import AboutScreen from "../screens/AboutScreen";

const Stack = createStackNavigator();

const FlexBoxStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FlexBoxMain" component={FlexBoxComponent} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="ContactScreen" component={ContactScreen} />
      <Stack.Screen name="WorkerScreen" component={WorkerScreen} />
      <Stack.Screen name="RegCompScreen" component={RegCompScreen} />
      <Stack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
      />
      <Stack.Screen name="HelpScreen" component={HelpScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="AboutScreen" component={AboutScreen} />
    </Stack.Navigator>
  );
};

export default FlexBoxStack;
