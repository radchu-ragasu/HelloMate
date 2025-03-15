import React, { useState } from "react";
import { 
  View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal 
} from "react-native";
import { useNavigation } from "@react-navigation/native";  // ✅ Import navigation
import { FontAwesome } from "@expo/vector-icons";

const OrderDetailScreen = () => {
  const [modalVisible, setModalVisible] = useState(false); 
  const navigation = useNavigation();  // ✅ Get navigation instance

  return (
    <ScrollView style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>  
          <FontAwesome name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
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

      {/* Details */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Details</Text>
        <Text style={styles.detailsText} numberOfLines={2}>
          There are no limits in the world of Hello Mate. You can be both a customer and a helper.
        </Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
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

      {/* MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Details</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <FontAwesome name="close" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalText}>
              There are no limits in the world of Hello Mate. You can be both a customer and a helper.
              There are no limits in the world of Hello Mate. You can be both a customer and a helper.
              There are no limits in the world of Hello Mate. You can be both a customer and a helper.
            </Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

// Mock Data
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
  statusContainer: {
    backgroundColor: "#FFCC00",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  statusDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 5,
  },
  addressText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#444",
    marginTop: 10,
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

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#4A90E2",
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalTitle: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  modalText: {
    marginTop: 10,
    color: "#444",
  },
});

export default OrderDetailScreen;
