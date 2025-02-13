import React from "react";
import { View, StyleSheet } from "react-native";
import FlexBoxComponent from "../components/dashboardFlex";

const SomeScreen = () => {
  return (
    <View style={styles.container}>
      <FlexBoxComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SomeScreen;
