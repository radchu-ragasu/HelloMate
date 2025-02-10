import { Stack, Screen } from "expo-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NotificationAndOrder from "./components/NotificationAndOrder"; 
import SearchBar from "./components/SearchBar";
import ServiceGrid from "./components/ServiceGrid";
import Dashboard from "./screens/Dashboard";
import LoginScreen from "./screens/LoginScreen"; 
import NotificationScreen from "./screens/NotificationScreen"; 
import OrderScreen from "./screens/OrderScreen";
import Index from "./index"; 

export default function RootLayout() {
  return (
    <Stack>
      <Screen name="index" Component={Index} /> {/* Your main/index screen */}
      <Screen name="login" Component={LoginScreen} />
      <Screen name="dashboard" Component={Dashboard} />
      <Screen name="notifications" Component={NotificationScreen} />
      <Screen name="orders" Component={OrderScreen} />
      <Screen name="footer" Component={Footer} /> {/* If you want Footer as a separate screen */}
      <Screen name="header" Component={Header} /> {/* If you want Header as a separate screen */}
      <Screen name="notification-and-order" Component={NotificationAndOrder} />
      <Screen name="search" Component={SearchBar} />
      <Screen name="services" Component={ServiceGrid} />
      {/* ... other screens */}
    </Stack>
  );
}