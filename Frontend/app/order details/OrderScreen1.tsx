import React, { useState } from "react";
import { 
  View, Text, TouchableOpacity, Modal, StyleSheet, Image 
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; 
import { useNavigation } from "@react-navigation/native"; // Navigation hook
import { Linking } from "react-native"; // For opening phone dialer

const OrderScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const navigation = useNavigation(); // Navigation instance

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Order Detail Header */}
      <Text style={styles.header}>Order Detail</Text>

      {/* Order Status */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Order Status</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>Pending</Text>
        </View>
      </View>
      <Text style={styles.statusDescription}>
        We have received your order and will get back to you as soon as the order is reviewed.
      </Text>

      {/* Address */}
      <Text style={styles.label}>Address:</Text>
      <Text style={styles.address}>125, 2nd Street, California, 19288</Text>

      {/* Service Type Selection */}
      <Text style={styles.label}>Service Type</Text>
      <View style={styles.serviceContainer}>
        {["Repair", "Cleaning", "Electrician"].map((service) => (
          <TouchableOpacity
            key={service}
            style={[
              styles.serviceBox,
              selectedService === service && styles.selectedService
            ]}
            onPress={() => setSelectedService(service)}
          >
            <Text>{service === "Repair" ? "🛠" : service === "Cleaning" ? "🧹" : "🔌"} {service}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Help Button */}
      <TouchableOpacity style={styles.helpButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.helpText}>Need Help?</Text>
      </TouchableOpacity>

      {/* Help Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Image source={require("../../assets/images/image.png")} style={styles.modalIcon} />
            <Text style={styles.modalTitle}>Do you need any Help?</Text>
            <Text style={styles.modalDescription}>
              After confirmation, we are going to assign workers for your order.
            </Text>
            <TouchableOpacity 
              style={styles.contactButton} 
              onPress={() => Linking.openURL("tel:+1234567890")}
            >
              <Text style={styles.contactText}>Contact</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F5F5F5" },
  backButton: { position: "absolute", top: 20, left: 15 },
  header: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginVertical: 20 },
  
  // Order Status
  statusContainer: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  statusLabel: { fontSize: 16, fontWeight: "bold" },
  statusBadge: { backgroundColor: "#FFCC80", paddingHorizontal: 10, borderRadius: 15, marginLeft: 10 },
  statusText: { color: "#D68910", fontWeight: "bold" },
  statusDescription: { marginVertical: 10, color: "#555" },

  // Address
  label: { fontSize: 16, fontWeight: "bold", marginTop: 20 },
  address: { fontSize: 16, fontWeight: "bold", color: "#2E86C1" },

  // Service Selection
  serviceContainer: { flexDirection: "row", marginTop: 10 },
  serviceBox: { backgroundColor: "#E3F2FD", padding: 10, borderRadius: 10, marginRight: 10 },
  selectedService: { backgroundColor: "#90CAF9" },

  // Help Button
  helpButton: { marginTop: 30, backgroundColor: "#1976D2", padding: 12, borderRadius: 8, alignItems: "center" },
  helpText: { color: "white", fontWeight: "bold" },

  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  modalContainer: { backgroundColor: "white", padding: 20, borderRadius: 10, alignItems: "center", width: "80%" },
  modalIcon: { width: 60, height: 60, marginBottom: 10 },
  modalTitle: { fontSize: 18, fontWeight: "bold" },
  modalDescription: { textAlign: "center", color: "#555", marginVertical: 10 },
  contactButton: { backgroundColor: "black", padding: 12, borderRadius: 8, marginTop: 10, width: "100%", alignItems: "center" },
  contactText: { color: "white", fontWeight: "bold" },
  closeButton: { marginTop: 10, padding: 10 },
  closeText: { color: "#333", fontWeight: "bold" },
});

export default OrderScreen;
