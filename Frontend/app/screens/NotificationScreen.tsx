import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const NotificationScreen = () => {
  const notifications = [
    { id: "1", message: "Your order is on the way!" },
    { id: "2", message: "Service request accepted." },
    { id: "3", message: "Your invoice has been generated." },
    { id: "4", message: "Your request is pending approval." },
  ];

  const renderItem = ({ item }: { item: { message: string } }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.notificationText}>{item.message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  notificationItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
  },
  notificationText: {
    fontSize: 16,
    color: "#333",
  },
});

export default NotificationScreen;
