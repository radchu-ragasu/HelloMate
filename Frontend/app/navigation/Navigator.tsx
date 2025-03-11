import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardStack from "../navigation/dashboardStack";
import FlexBoxStack from "../navigation/FlexBoxStack"; // Import the new stack
import NotificationScreen from "../screens/NotificationScreen";
import OrderScreen from "../order details/OrderScreen";
import PromoScreen from "../screens/Promotion ";
import { Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const Navigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={DashboardStack}
        options={{ tabBarIcon: () => <Feather name="home" size={24} /> }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{ tabBarIcon: () => <Feather name="bell" size={24} /> }}
      />
      <Tab.Screen
        name="Orders"
        component={OrderScreen}
        options={{
          tabBarIcon: () => <Feather name="shopping-cart" size={24} />,
        }}
      />
      <Tab.Screen
        name="Promo"
        component={PromoScreen}
        options={{
          tabBarIcon: () => <Feather name="settings" size={24} />,
        }}
      />
    </Tab.Navigator>
    
  );
};

export default Navigator;
