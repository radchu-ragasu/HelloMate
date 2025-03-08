import React from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";

export default function Message() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>React Native is Working!</Text>
      <Button
        title="Click Me"
        onPress={() => Alert.alert("Success", "Your setup is working!")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});
