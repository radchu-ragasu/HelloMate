import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeTab from "./tabs/HomeTab";
import ProfileTab from "./tabs/ProfileTab";
import SettingsTab from "./tabs/SettingsTab";
import NotificationsTab from "./tabs/NotificationsTab";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const Dashboard = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Home") iconName = "home";
            else if (route.name === "Profile") iconName = "person";
            else if (route.name === "Settings") iconName = "settings";
            else if (route.name === "Notifications") iconName = "notifications";

            return (
              <Ionicons name={iconName as any} size={size} color={color} />
            );
          },
          tabBarActiveTintColor: "#3498db",
          tabBarInactiveTintColor: "gray",
          headerShown: false, // Hide header if not needed
        })}
      >
        <Tab.Screen name="Home" component={HomeTab} />
        <Tab.Screen name="Profile" component={ProfileTab} />
        <Tab.Screen name="Settings" component={SettingsTab} />
        <Tab.Screen name="Notifications" component={NotificationsTab} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Dashboard;
