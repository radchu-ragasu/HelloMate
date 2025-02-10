import React from "react";
import { View, Text } from "react-native"; // Add this import to use View and Text

import { NavigationContainer } from "@react-navigation/native";
import Navigator from "../app/navigation/Navigator"; // Import Navigator which contains the Tab Navigator

export default function App() {
  return (

      <Navigator />
   
  );
}
