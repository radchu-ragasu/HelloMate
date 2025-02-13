import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { services } from "../utils/data";

const ServiceGrid = () => {
  return (
    <View style={styles.grid}>
      {services.map((service) => (
        <TouchableOpacity key={service.id} style={styles.card}>
          {/* Render Image */}
          <Image
            source={service.image} // Using the image path from the services data
            style={styles.image}
          />
          {/* Render Text inside <Text> component */}
          <Text style={styles.text}>{service.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 16,
    justifyContent: "space-between",
  },
  card: {
    width: "30%",
    padding: 8,
    backgroundColor: "#3b82f6",
    borderRadius: 18,
    marginBottom: 16,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginBottom: 7,
    resizeMode: "cover", // Ensures proper scaling of the image
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});

export default ServiceGrid;
