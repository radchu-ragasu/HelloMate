import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "./firebase"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set, push } from "firebase/database";
import { 
  Alert, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";


const CustomerSignup = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        address: "",
        latitude: null,
        longitude: null,
    });

    const [errors, setErrors] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [locationModalVisible, setLocationModalVisible] = useState(false);
    const [locatingUser, setLocatingUser] = useState(false);
    const [mapRegion, setMapRegion] = useState(null);
    const navigation = useNavigation();

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            address: "",
        };

        // Check for empty fields
        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required";
            isValid = false;
        }
        
        if (!formData.address.trim()) {
            newErrors.address = "Address is required";
            isValid = false;
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
            isValid = false;
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = "Password is required";
            isValid = false;
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
            isValid = false;
        } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/.test(formData.password)) {
            newErrors.password = "Password must include uppercase, lowercase, number and special character";
            isValid = false;
        }

        // Password confirmation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
            isValid = false;
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const getCurrentLocation = async () => {
        setLocatingUser(true);
        try {
            // This requires the expo-location package
            // Replace with appropriate implementation if not using Expo
            const { status } = await Location.requestForegroundPermissionsAsync();
            
            if (status !== 'granted') {
                Alert.alert('Permission denied', 'Permission to access location was denied');
                setLocatingUser(false);
                return;
            }
            
            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            });
            
            const { latitude, longitude } = location.coords;
            
            // Get address from coordinates
            const addressResponse = await Location.reverseGeocodeAsync({
                latitude,
                longitude
            });
            
            if (addressResponse && addressResponse.length > 0) {
                const addressObj = addressResponse[0];
                const formattedAddress = [
                    addressObj.name,
                    addressObj.street,
                    addressObj.city,
                    addressObj.region,
                    addressObj.postalCode,
                    addressObj.country
                ].filter(Boolean).join(", ");
                
                setFormData({
                    ...formData,
                    address: formattedAddress,
                    latitude,
                    longitude
                });
                
                setMapRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005
                });
            }
            
            setLocationModalVisible(true);
        } catch (error) {
            Alert.alert('Error', 'Failed to get current location. Please enter your address manually.');
            console.error(error);
        } finally {
            setLocatingUser(false);
        }
    };

    const confirmLocation = () => {
        setLocationModalVisible(false);
    };

    const handleMapPress = (event) => {
        const { coordinate } = event.nativeEvent;
        
        setMapRegion({
            ...mapRegion,
            latitude: coordinate.latitude,
            longitude: coordinate.longitude
        });
        
        setFormData({
            ...formData,
            latitude: coordinate.latitude,
            longitude: coordinate.longitude
        });
        
        // Here you would typically do a reverse geocode to get the address
        // This is simplified for the example
        Location.reverseGeocodeAsync({
            latitude: coordinate.latitude,
            longitude: coordinate.longitude
        }).then(addressResponse => {
            if (addressResponse && addressResponse.length > 0) {
                const addressObj = addressResponse[0];
                const formattedAddress = [
                    addressObj.name,
                    addressObj.street,
                    addressObj.city,
                    addressObj.region,
                    addressObj.postalCode,
                    addressObj.country
                ].filter(Boolean).join(", ");
                
                setFormData({
                    ...formData,
                    address: formattedAddress,
                    latitude: coordinate.latitude,
                    longitude: coordinate.longitude
                });
            }
        });
    };

    const handleSubmit = async () => {
        setError("");
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            const userId = userCredential.user.uid;

            const customersRef = ref(db, "customers");
            const newCustomerRef = push(customersRef);

            // Store user data in Firebase Realtime Database
            await set(newCustomerRef, {
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                location: formData.latitude && formData.longitude ? {
                    latitude: formData.latitude,
                    longitude: formData.longitude
                } : null,
                userId: userId,
                createdAt: new Date().toISOString(),
            });

            setLoading(false);
            Alert.alert("Signup Successful!");
            navigation.navigate("CustomerDashboard");
        } catch (error: any) {
            setLoading(false);
            setError(error.message);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardAvoidView}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.content}>
                        <Text style={styles.title}>Customer Signup</Text>

                        {error && <Text style={styles.errorAlert}>{error}</Text>}

                        <View style={styles.form}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Full Name</Text>
                                <TextInput
                                    style={[
                                        styles.input,
                                        errors.fullName ? styles.inputError : null
                                    ]}
                                    placeholder="Enter your full name"
                                    placeholderTextColor="#a0a0a0"
                                    value={formData.fullName}
                                    onChangeText={(text) =>
                                        setFormData({ ...formData, fullName: text })
                                    }
                                />
                                {errors.fullName ? (
                                    <Text style={styles.errorText}>{errors.fullName}</Text>
                                ) : null}
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Email</Text>
                                <TextInput
                                    style={[
                                        styles.input,
                                        errors.email ? styles.inputError : null
                                    ]}
                                    placeholder="Enter your email address"
                                    placeholderTextColor="#a0a0a0"
                                    value={formData.email}
                                    onChangeText={(text) => setFormData({ ...formData, email: text })}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                                {errors.email ? (
                                    <Text style={styles.errorText}>{errors.email}</Text>
                                ) : null}
                            </View>
                            
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Phone Number (Optional)</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter your phone number"
                                    placeholderTextColor="#a0a0a0"
                                    value={formData.phone}
                                    onChangeText={(text) =>
                                        setFormData({ ...formData, phone: text })
                                    }
                                    keyboardType="phone-pad"
                                />
                            </View>
                            
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Address</Text>
                                <View style={styles.locationContainer}>
                                    <TextInput
                                        style={[
                                            styles.locationInput,
                                            errors.address ? styles.inputError : null
                                        ]}
                                        placeholder="Enter your address"
                                        placeholderTextColor="#a0a0a0"
                                        value={formData.address}
                                        onChangeText={(text) =>
                                            setFormData({ ...formData, address: text })
                                        }
                                    />
                                    <TouchableOpacity 
                                        style={styles.locationButton}
                                        onPress={getCurrentLocation}
                                        disabled={locatingUser}
                                    >
                                        {locatingUser ? (
                                            <ActivityIndicator size="small" color="#fff" />
                                        ) : (
                                            <Ionicons name="location" size={20} color="#fff" />
                                        )}
                                    </TouchableOpacity>
                                </View>
                                {errors.address ? (
                                    <Text style={styles.errorText}>{errors.address}</Text>
                                ) : null}
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Password</Text>
                                <TextInput
                                    style={[
                                        styles.input,
                                        errors.password ? styles.inputError : null
                                    ]}
                                    placeholder="Create a password"
                                    placeholderTextColor="#a0a0a0"
                                    value={formData.password}
                                    onChangeText={(text) =>
                                        setFormData({ ...formData, password: text })
                                    }
                                    secureTextEntry
                                />
                                {errors.password ? (
                                    <Text style={styles.errorText}>{errors.password}</Text>
                                ) : null}
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Confirm Password</Text>
                                <TextInput
                                    style={[
                                        styles.input,
                                        errors.confirmPassword ? styles.inputError : null
                                    ]}
                                    placeholder="Confirm your password"
                                    placeholderTextColor="#a0a0a0"
                                    value={formData.confirmPassword}
                                    onChangeText={(text) =>
                                        setFormData({ ...formData, confirmPassword: text })
                                    }
                                    secureTextEntry
                                />
                                {errors.confirmPassword ? (
                                    <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                                ) : null}
                            </View>

                            <TouchableOpacity
                                style={[styles.button, loading ? styles.buttonDisabled : null]}
                                onPress={handleSubmit}
                                disabled={loading}
                            >
                                <Text style={styles.buttonText}>
                                    {loading ? "Creating Account..." : "Create Account"}
                                </Text>
                            </TouchableOpacity>

                            <View style={styles.loginContainer}>
                                <Text style={styles.loginText}>Already have an account? </Text>
                                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                                    <Text style={styles.loginLink}>Login</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Location Map Modal */}
            <Modal
                animationType="slide"
                transparent={false}
                visible={locationModalVisible}
                onRequestClose={() => setLocationModalVisible(false)}
            >
                <SafeAreaView style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Confirm Your Location</Text>
                        <TouchableOpacity 
                            style={styles.closeButton}
                            onPress={() => setLocationModalVisible(false)}
                        >
                            <Ionicons name="close" size={24} color="#333" />
                        </TouchableOpacity>
                    </View>
                    
                    {mapRegion && (
                        <View style={styles.mapContainer}>
                            {/* This requires react-native-maps */}
                            <MapView
                                style={styles.map}
                                region={mapRegion}
                                onPress={handleMapPress}
                            >
                                <Marker
                                    coordinate={{
                                        latitude: mapRegion.latitude,
                                        longitude: mapRegion.longitude
                                    }}
                                    draggable
                                    onDragEnd={(e) => handleMapPress(e)}
                                />
                            </MapView>
                        </View>
                    )}
                    
                    <View style={styles.addressPreview}>
                        <Text style={styles.addressPreviewLabel}>Selected Address:</Text>
                        <Text style={styles.addressPreviewText}>{formData.address}</Text>
                    </View>
                    
                    <Text style={styles.mapInstructions}>
                        Tap on the map to adjust your location or drag the marker.
                    </Text>
                    
                    <TouchableOpacity 
                        style={styles.confirmButton}
                        onPress={confirmLocation}
                    >
                        <Text style={styles.confirmButtonText}>Confirm Location</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    keyboardAvoidView: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 24,
        marginTop: 20,
        color: "#333",
        textAlign: "center",
    },
    errorAlert: {
        color: "#e74c3c",
        marginBottom: 12,
        textAlign: "center",
        fontSize: 14,
        padding: 10,
        backgroundColor: "rgba(231, 76, 60, 0.1)",
        borderRadius: 12,
        width: "100%",
        maxWidth: 400,
    },
    form: {
        width: "100%",
        maxWidth: 400,
        backgroundColor: "#fff",
        padding: 24,
        borderRadius: 24,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 20,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: "500",
        marginBottom: 6,
        color: "#555",
    },
    input: {
        borderWidth: 1,
        borderColor: "#e0e0e0",
        padding: 14,
        borderRadius: 16,
        fontSize: 16,
        backgroundColor: "#f9f9f9",
    },
    locationContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    locationInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#e0e0e0",
        padding: 14,
        borderRadius: 16,
        fontSize: 16,
        backgroundColor: "#f9f9f9",
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderRightWidth: 0,
    },
    locationButton: {
        backgroundColor: "#a8dadc",
        padding: 14.5,
        justifyContent: "center",
        alignItems: "center",
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16,
        width: 50,
    },
    inputError: {
        borderColor: "#e74c3c",
        borderWidth: 1,
    },
    errorText: {
        color: "#e74c3c",
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
    },
    button: {
        backgroundColor: "#a8dadc",
        padding: 16,
        borderRadius: 24,
        alignItems: "center",
        marginTop: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    buttonDisabled: {
        backgroundColor: "#c0e0e0",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 18,
    },
    loginContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 24,
        padding: 8,
    },
    loginText: {
        fontSize: 14,
        color: "#7f8c8d",
    },
    loginLink: {
        color: "#a8dadc",
        fontWeight: "bold",
        fontSize: 14,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "#fff",
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
    },
    closeButton: {
        padding: 5,
    },
    mapContainer: {
        height: 300,
        width: "100%",
        marginVertical: 16,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    addressPreview: {
        padding: 16,
        backgroundColor: "#f9f9f9",
        borderRadius: 12,
        margin: 16,
    },
    addressPreviewLabel: {
        fontSize: 14,
        fontWeight: "500",
        color: "#555",
        marginBottom: 4,
    },
    addressPreviewText: {
        fontSize: 16,
        color: "#333",
    },
    mapInstructions: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
        paddingHorizontal: 32,
        marginBottom: 16,
    },
    confirmButton: {
        backgroundColor: "#a8dadc",
        padding: 16,
        borderRadius: 24,
        margin: 16,
        alignItems: "center",
    },
    confirmButtonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 18,
    },
});

export default CustomerSignup;