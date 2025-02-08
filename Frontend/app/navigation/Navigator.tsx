import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/Dashboard";
import NotificationScreen from "../screens/NotificationScreen";
import OrderScreen from "../screens/OrderScreen";
import { Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const Navigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={{ tabBarIcon: () => <Feather name="home" size={20} /> }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{ tabBarIcon: () => <Feather name="bell" size={20} /> }}
      />
      <Tab.Screen
        name="Orders"
        component={OrderScreen}
        options={{
          tabBarIcon: () => <Feather name="shopping-cart" size={20} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Navigator;
