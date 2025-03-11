import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";


const OrderDetailScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <FontAwesome name="arrow-left" size={20} color="#fff" />
        <Text style={styles.headerTitle}>Order Detail</Text>
        <FontAwesome name="ellipsis-h" size={20} color="#fff" />
      </View>

      {/* Order Status */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Order Status</Text>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>Pending</Text>
        </View>
        <Text style={styles.statusDescription}>
          We have received your order and will get back to you as soon as the order is reviewed.
        </Text>
      </View>

      {/* Address */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Address:</Text>
        <Text style={styles.addressText}>125, 2nd Street, California, 19288</Text>
      </View>

      {/* Service Type */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Service Type</Text>
        <View style={styles.serviceRow}>
          {serviceTypes.map((service, index) => (
            <View key={index} style={styles.serviceBox}>
              <Image source={service.image} style={styles.serviceIcon} />
              <Text style={styles.serviceText}>{service.name}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Order Date */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Order Date</Text>
        <Text style={styles.boldText}>20 December 12:00 PM</Text>
      </View>

      {/* Details */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Details</Text>
        <Text style={styles.detailsText}>
          There are no limits in the world of Hello Mate. You can be both a customer and a helper.
        </Text>
        <TouchableOpacity>
          <Text style={styles.showMoreText}>Show more</Text>
        </TouchableOpacity>
      </View>

      {/* Attachments */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Attachments</Text>
        <View style={styles.attachmentsRow}>
          {attachments.map((image, index) => (
            <Image key={index} source={image} style={styles.attachmentImage} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

// Mock Data
const serviceTypes = [
  { name: "Cleaning", image: require("../../assets/images/img1.jpg") },
  { name: "Repairing", image: require("../../assets/images/img2.jpg") },
  { name: "Electrician", image: require("../../assets/images/img3.jpg") },
  { name: "Carpenter", image: require("../../assets/images/img4.jpg") },
];

const attachments = [
  require("../../assets/images/img1.jpg"),
  require("../../assets/images/img2.jpg"),
  require("../../assets/images/img3.jpg"),
  require("../../assets/images/img4.jpg"),
];

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#4A90E2",
    padding: 15,
  },
  headerTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  statusContainer: {
    backgroundColor: "#E3F2FD",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusText: {
    color: "#1E88E5",
    fontWeight: "bold",
  },
  statusDescription: {
    marginTop: 5,
    color: "#666",
  },
  addressText: {
    fontSize: 14,
    color: "#444",
  },
  serviceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  serviceBox: {
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#F0F0F0",
  },
  serviceIcon: {
    width: 40,
    height: 40,
  },
  serviceText: {
    fontSize: 12,
    marginTop: 5,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 14,
  },
  detailsText: {
    color: "#666",
  },
  showMoreText: {
    color: "#1E88E5",
    fontWeight: "bold",
    marginTop: 5,
  },
  attachmentsRow: {
    flexDirection: "row",
    marginTop: 10,
  },
  attachmentImage: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 5,
  },
});

export default OrderDetailScreen;
