import React from "react";//import 
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "../app/navigation/Navigator";

const App = () => {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
};

export default App;
