import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "./firebase"; // Adjust the path if your firebase.js is in a different location
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set, push } from "firebase/database";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const BusinessSignup = () => {
    const [formData, setFormData] = useState({
        businessName: "",
        email: "",
        password: "",
        confirmPassword: "",
        ownerName: "",
        phone: "",
        address: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigation = useNavigation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
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

            const businessOwnersRef = ref(db, "businessOwners");
            const newBusinessOwnerRef = push(businessOwnersRef);

            // Store user data in Firebase Realtime Database
            await set(newBusinessOwnerRef, {
                businessName: formData.businessName,
                ownerName: formData.ownerName,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                userId: userId, // Store userId
            });

            setLoading(false);
            Alert.alert("Signup Successful!");
            navigation.navigate("BusinessDashboard");
        } catch (error: any) {
            setLoading(false);
            setError(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Business Owner Signup</Text>

            {error && <Text style={styles.error}>{error}</Text>}

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    type="text"
                    name="businessName"
                    placeholder="Business Name"
                    value={formData.businessName}
                    onChangeText={(text) =>
                        setFormData({ ...formData, businessName: text })
                    }
                    required
                />
                <TextInput
                    style={styles.input}
                    type="text"
                    name="ownerName"
                    placeholder="Owner Name"
                    value={formData.ownerName}
                    onChangeText={(text) =>
                        setFormData({ ...formData, ownerName: text })
                    }
                    required
                />
                <TextInput
                    style={styles.input}
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChangeText={(text) => setFormData({ ...formData, email: text })}
                    required
                />
                <TextInput
                    style={styles.input}
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChangeText={(text) => setFormData({ ...formData, phone: text })}
                    required
                />
                <TextInput
                    style={styles.input}
                    type="text"
                    name="address"
                    placeholder="Business Address"
                    value={formData.address}
                    onChangeText={(text) =>
                        setFormData({ ...formData, address: text })
                    }
                    required
                />
                <TextInput
                    style={styles.input}
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChangeText={(text) =>
                        setFormData({ ...formData, password: text })
                    }
                    required
                />
                <TextInput
                    style={styles.input}
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChangeText={(text) =>
                        setFormData({ ...formData, confirmPassword: text })
                    }
                    required
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>
                        {loading ? "Signing Up..." : "Sign Up"}
                    </Text>
                </TouchableOpacity>

                <View style={styles.loginContainer}>
                    <Text>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.loginLink}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f4f4f4",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
    },
    error: {
        color: "red",
        marginBottom: 10,
    },
    form: {
        width: "100%",
        maxWidth: 400,
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 10,
        marginBottom: 10,
        borderRadius: 4,
    },
    button: {
        backgroundColor: "#007bff",
        padding: 12,
        borderRadius: 4,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    loginContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 15,
    },
    loginLink: {
        color: "#007bff",
    },
});

export default BusinessSignup;
