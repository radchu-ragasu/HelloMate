import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  Feather,
  AntDesign,
  MaterialIcons,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const FlexBoxComponent = () => {
  const navigation = useNavigation();

  // Define screen names with corresponding icons
  const screens = [
    { title: "Hello Mate", screen: null }, // First flex (not clickable, no icon)
    {
      title: "My Profile",
      screen: "ProfileScreen",
      icon: <FontAwesome5 name="user-alt" size={20} color="#FFF" />,
    },
    {
      title: "Contact Us",
      screen: "ContactScreen",
      icon: <Feather name="phone" size={20} color="#FFF" />,
    },
    {
      title: "Become a worker",
      screen: "WorkerScreen",
      icon: <FontAwesome5 name="briefcase" size={20} color="#FFF" />,
    },
    {
      title: "Register Company",
      screen: "RegCompScreen",
      icon: <Ionicons name="business" size={20} color="#FFF" />,
    },
    {
      title: "Share",
      screen: "NotificationsScreen",
      icon: <Feather name="share-2" size={20} color="#FFF" />,
    },
    {
      title: "Rate",
      screen: "HelpScreen",
      icon: <MaterialIcons name="star-rate" size={20} color="#FFF" />,
    },
    {
      title: "Settings",
      screen: "SettingsScreen",
      icon: <Feather name="settings" size={20} color="#FFF" />,
    },
    {
      title: "Log Out",
      screen: "AboutScreen",
      icon: <AntDesign name="logout" size={20} color="#FFF" />,
    },
  ];

  return (
    <View style={styles.container}>
      {screens.map((item, index) => (
        <View key={index}>
          <TouchableOpacity
            style={[styles.flexBox, index === 0 ? styles.firstFlexBox : null]}
            onPress={() => item.screen && navigation.navigate(item.screen)}
            disabled={index === 0} // Disable navigation for first flex box
          >
            {index !== 0 && (
              <View style={styles.iconContainer}>{item.icon}</View>
            )}
            <Text style={[styles.text, index === 0 && styles.firstText]}>
              {item.title}
            </Text>
            {index === 0 ? (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.closeIcon}
              >
                <Feather name="x" size={24} color="#FFF" />
              </TouchableOpacity>
            ) : (
              <Feather name="chevron-right" size={24} color="#FFF" />
            )}
          </TouchableOpacity>
        </View>
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
    alignItems: "center",
    backgroundColor: "#ADD8E6",
    padding: 15,
    marginBottom: 10,
    borderRadius: 15,
    elevation: 3,
    width: 390,
  },
  firstFlexBox: {
    backgroundColor: "#007BFF",
    padding: 20, // Bigger size for first flex
  },
  text: {
    fontSize: 18,
    color: "#FFF",
    flex: 1, // Allows text to take available space
  },
  firstText: {
    fontWeight: "bold",
  },
  closeIcon: {
    padding: 5, // Space for touchable area
  },
  iconContainer: {
    marginRight: 10, // Space between left icon and text
  },
});

export default FlexBoxComponent;
