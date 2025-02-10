import React from "react";
import { View, Text, StyleSheet } from "react-native";

const OrderScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No orders placed yet</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18, // Equivalent to text-lg
  },
});

export default OrderScreen;
