import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const FlexBoxComponent = () => {
  const navigation = useNavigation();

  // Define screen names for each flex box
  const screens = [
    { title: "Hello Mate", screen: "Dashboard" },
    {title: "My Profile", screen:"ProfileScreen"},
    { title: "Contact Us", screen: "ContactScreen" },
    { title: "Become a worker", screen: "WorkerScreen" },
    { title: "Register Company", screen: "RegCompScreen" },
    { title: "Share", screen: "NotificationsScreen" },
    { title: "Rate", screen: "HelpScreen" },
    { title: "Settings", screen: "SettingsScreen" },
    { title: "Log Out", screen: "AboutScreen" },
  ];

  return (
    <View style={styles.container}>
      {screens.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.flexBox, index === 0 && styles.firstFlexBox]}
          onPress={() => navigation.navigate(item.screen)}
        >
          <Text style={[styles.text, index === 0 && styles.firstText]}>
            {item.title}
          </Text>
          <Feather name="chevron-right" size={24} color="#FFF" />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  flexBox: {
    flexDirection: "row",
    width:390,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ADD8E6",
    padding: 15,
    marginBottom: 10,
    borderRadius: 15,
    elevation: 3,
  },
  firstFlexBox: {
    backgroundColor: "#007BFF", // Dark Blue for the first box
  },
  text: {
    fontSize: 18,
    color: "#FFF",
  },
  firstText: {
    fontWeight: "bold",
  },
});

export default FlexBoxComponent;
