import React from "react";
import { View, StyleSheet } from "react-native";
import FlexBoxStack from "../navigation/FlexBoxStack"; // Import the stack navigator

const MenuScreen = () => {
  return (
    <View style={styles.container}>
      <FlexBoxStack />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MenuScreen;
