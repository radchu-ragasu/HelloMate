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
  ActivityIndicator,
  Switch
} from "react-native";
import { Ionicons } from "@expo/vector-icons";



const BusinessOwnerSignup = () => {
    const [formData, setFormData] = useState({
        businessName: "",
        ownerName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        businessAddress: "",
        businessDescription: "",
        businessCategory: "",
        operatingHours: "",
        latitude: null,
        longitude: null,
        acceptsDelivery: false,
        acceptsPickup: true,
    });

    const [errors, setErrors] = useState({
        businessName: "",
        ownerName: "",
        email: "",
        password: "",
        confirmPassword: "",
        businessAddress: "",
        businessCategory: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [locationModalVisible, setLocationModalVisible] = useState(false);
    const [locatingUser, setLocatingUser] = useState(false);
    const [mapRegion, setMapRegion] = useState(null);
    const [businessLogo, setBusinessLogo] = useState(null);
    const navigation = useNavigation();

    const businessCategories = [
        "Restaurant", 
        "Retail", 
        "Services", 
        "Grocery", 
        "Pharmacy", 
        "Electronics", 
        "Fashion", 
        "Home & Garden",
        "Other"
    ];

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            businessName: "",
            ownerName: "",
            email: "",
            password: "",
            confirmPassword: "",
            businessAddress: "",
            businessCategory: "",
        };

        // Check for empty fields
        if (!formData.businessName.trim()) {
            newErrors.businessName = "Business name is required";
            isValid = false;
        }
        
        if (!formData.ownerName.trim()) {
            newErrors.ownerName = "Owner name is required";
            isValid = false;
        }
        
        if (!formData.businessAddress.trim()) {
            newErrors.businessAddress = "Business address is required";
            isValid = false;
        }

        if (!formData.businessCategory) {
            newErrors.businessCategory = "Please select a business category";
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
                    businessAddress: formattedAddress,
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
                    businessAddress: formattedAddress,
                    latitude: coordinate.latitude,
                    longitude: coordinate.longitude
                });
            }
        });
    };

    const pickBusinessLogo = async () => {
        try {
            // Request permissions first
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            
            if (permissionResult.granted === false) {
                Alert.alert("Permission Required", "You need to grant access to your photo library to upload images.");
                return;
            }
            
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });
            
            if (!result.canceled) {
                setBusinessLogo(result.assets[0].uri);
            }
        } catch (error) {
            Alert.alert("Error", "Failed to select image. Please try again.");
            console.error(error);
        }
    };

    const renderCategoryPicker = () => {
        return (
            <View style={styles.categoryContainer}>
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesContent}
                >
                    {businessCategories.map((category) => (
                        <TouchableOpacity
                            key={category}
                            style={[
                                styles.categoryButton,
                                formData.businessCategory === category && styles.categorySelected
                            ]}
                            onPress={() => setFormData({...formData, businessCategory: category})}
                        >
                            <Text 
                                style={[
                                    styles.categoryText,
                                    formData.businessCategory === category && styles.categoryTextSelected
                                ]}
                            >
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                {errors.businessCategory ? (
                    <Text style={styles.errorText}>{errors.businessCategory}</Text>
                ) : null}
            </View>
        );
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

            const businessesRef = ref(db, "businesses");
            const newBusinessRef = push(businessesRef);

            // Here you would upload the business logo to storage if needed
            // and get the download URL to store in the database
            let logoUrl = null;
            /* 
            if (businessLogo) {
                // Code to upload image to Firebase Storage would go here
                // This is just a placeholder
                const response = await fetch(businessLogo);
                const blob = await response.blob();
                const storageRef = ref(storage, `business_logos/${userId}`);
                await uploadBytes(storageRef, blob);
                logoUrl = await getDownloadURL(storageRef);
            }
            */

            // Store business data in Firebase Realtime Database
            await set(newBusinessRef, {
                businessName: formData.businessName,
                ownerName: formData.ownerName,
                email: formData.email,
                phone: formData.phone,
                businessAddress: formData.businessAddress,
                businessDescription: formData.businessDescription,
                businessCategory: formData.businessCategory,
                operatingHours: formData.operatingHours,
                location: formData.latitude && formData.longitude ? {
                    latitude: formData.latitude,
                    longitude: formData.longitude
                } : null,
                acceptsDelivery: formData.acceptsDelivery,
                acceptsPickup: formData.acceptsPickup,
                logoUrl: logoUrl,
                userId: userId,
                createdAt: new Date().toISOString(),
                isApproved: false, // Business requires approval before it's visible
            });

            setLoading(false);
            Alert.alert(
                "Signup Successful!", 
                "Your business account has been created and is pending approval. You will be notified once approved."
            );
            navigation.navigate("BusinessDashboard");
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
                        <Text style={styles.title}>Business Registration</Text>

                        {error && <Text style={styles.errorAlert}>{error}</Text>}

                        <View style={styles.form}>
                            {/* Business Logo Section */}
                            <View style={styles.logoSection}>
                                <TouchableOpacity 
                                    style={styles.logoContainer}
                                    onPress={pickBusinessLogo}
                                >
                                    {businessLogo ? (
                                        <Image 
                                            source={{ uri: businessLogo }} 
                                            style={styles.logoImage} 
                                        />
                                    ) : (
                                        <View style={styles.logoPlaceholder}>
                                            <Ionicons name="business-outline" size={40} color="#a8dadc" />
                                            <Text style={styles.logoText}>Add Logo</Text>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Business Name</Text>
                                <TextInput
                                    style={[
                                        styles.input,
                                        errors.businessName ? styles.inputError : null
                                    ]}
                                    placeholder="Enter your business name"
                                    placeholderTextColor="#a0a0a0"
                                    value={formData.businessName}
                                    onChangeText={(text) =>
                                        setFormData({ ...formData, businessName: text })
                                    }
                                />
                                {errors.businessName ? (
                                    <Text style={styles.errorText}>{errors.businessName}</Text>
                                ) : null}
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Owner Name</Text>
                                <TextInput
                                    style={[
                                        styles.input,
                                        errors.ownerName ? styles.inputError : null
                                    ]}
                                    placeholder="Enter owner's full name"
                                    placeholderTextColor="#a0a0a0"
                                    value={formData.ownerName}
                                    onChangeText={(text) =>
                                        setFormData({ ...formData, ownerName: text })
                                    }
                                />
                                {errors.ownerName ? (
                                    <Text style={styles.errorText}>{errors.ownerName}</Text>
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
                                <Text style={styles.label}>Phone Number</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter business phone number"
                                    placeholderTextColor="#a0a0a0"
                                    value={formData.phone}
                                    onChangeText={(text) =>
                                        setFormData({ ...formData, phone: text })
                                    }
                                    keyboardType="phone-pad"
                                />
                            </View>
                            
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Business Address</Text>
                                <View style={styles.locationContainer}>
                                    <TextInput
                                        style={[
                                            styles.locationInput,
                                            errors.businessAddress ? styles.inputError : null
                                        ]}
                                        placeholder="Enter business address"
                                        placeholderTextColor="#a0a0a0"
                                        value={formData.businessAddress}
                                        onChangeText={(text) =>
                                            setFormData({ ...formData, businessAddress: text })
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
                                {errors.businessAddress ? (
                                    <Text style={styles.errorText}>{errors.businessAddress}</Text>
                                ) : null}
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Business Category</Text>
                                {renderCategoryPicker()}
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Business Description</Text>
                                <TextInput
                                    style={[styles.input, styles.textArea]}
                                    placeholder="Describe your business, products, or services..."
                                    placeholderTextColor="#a0a0a0"
                                    value={formData.businessDescription}
                                    onChangeText={(text) =>
                                        setFormData({ ...formData, businessDescription: text })
                                    }
                                    multiline
                                    numberOfLines={4}
                                    textAlignVertical="top"
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Operating Hours</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g. Mon-Fri: 9AM-6PM, Sat: 10AM-4PM"
                                    placeholderTextColor="#a0a0a0"
                                    value={formData.operatingHours}
                                    onChangeText={(text) =>
                                        setFormData({ ...formData, operatingHours: text })
                                    }
                                />
                            </View>

                            <View style={styles.optionsGroup}>
                                <Text style={styles.optionsLabel}>Business Options</Text>
                                
                                <View style={styles.switchOption}>
                                    <Text style={styles.switchLabel}>Accept Delivery Orders</Text>
                                    <Switch
                                        value={formData.acceptsDelivery}
                                        onValueChange={(value) => 
                                            setFormData({...formData, acceptsDelivery: value})
                                        }
                                        trackColor={{ false: "#e0e0e0", true: "#a8dadc" }}
                                        thumbColor={formData.acceptsDelivery ? "#f5f5f5" : "#f5f5f5"}
                                    />
                                </View>
                                
                                <View style={styles.switchOption}>
                                    <Text style={styles.switchLabel}>Accept Pickup Orders</Text>
                                    <Switch
                                        value={formData.acceptsPickup}
                                        onValueChange={(value) => 
                                            setFormData({...formData, acceptsPickup: value})
                                        }
                                        trackColor={{ false: "#e0e0e0", true: "#a8dadc" }}
                                        thumbColor={formData.acceptsPickup ? "#f5f5f5" : "#f5f5f5"}
                                    />
                                </View>
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
                                    {loading ? "Registering Business..." : "Register Business"}
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
                        <Text style={styles.modalTitle}>Confirm Business Location</Text>
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
                        <Text style={styles.addressPreviewLabel}>Selected Business Address:</Text>
                        <Text style={styles.addressPreviewText}>{formData.businessAddress}</Text>
                    </View>
                    
                    <Text style={styles.mapInstructions}>
                        Tap on the map to adjust your business location or drag the marker. Accurate location helps customers find you easily.
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
    logoSection: {
        alignItems: "center",
        marginBottom: 20,
    },
    logoContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#f0f0f0",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        borderWidth: 2,
        borderColor: "#e0e0e0",
        marginBottom: 10,
    },
    logoPlaceholder: {
        justifyContent: "center",
        alignItems: "center",
    },
    logoText: {
        marginTop: 5,
        fontSize: 12,
        color: "#777",
    },
    logoImage: {
        width: "100%",
        height: "100%",
        borderRadius: 50,
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
    textArea: {
        minHeight: 100,
        textAlignVertical: "top",
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
    categoryContainer: {
        marginBottom: 8,
    },
    categoriesContent: {
        paddingVertical: 8,
    },
    categoryButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: "#f0f0f0",
        marginRight: 8,
        borderWidth: 1,
        borderColor: "#e0e0e0",
    },
    categorySelected: {
        backgroundColor: "#a8dadc",
        borderColor: "#a8dadc",
    },
    categoryText: {
        color: "#555",
        fontSize: 14,
    },
    categoryTextSelected: {
        color: "#fff",
        fontWeight: "500",
    },
    optionsGroup: {
        marginBottom: 16,
        backgroundColor: "#f9f9f9",
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#e0e0e0",
    },
    optionsLabel: {
        fontSize: 14,
        fontWeight: "500",
        marginBottom: 12,
        color: "#555",
    },
    switchOption: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    switchLabel: {
        fontSize: 14,
        color: "#333",
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
      marginHorizontal: 16,
      marginBottom: 16,
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
      marginHorizontal: 16,
      marginBottom: 16,
  },
  confirmButton: {
      backgroundColor: "#a8dadc",
      padding: 16,
      borderRadius: 24,
      alignItems: "center",
      marginHorizontal: 16,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
  },
  confirmButtonText: {
      color: "#fff",
      fontWeight: "600",
      fontSize: 16,
  }
});

export default BusinessOwnerSignup;
