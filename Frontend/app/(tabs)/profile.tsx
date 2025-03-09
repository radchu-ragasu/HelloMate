"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, Alert } from "react-native"
import { router } from "expo-router"
import * as ImagePicker from "expo-image-picker"

export default function ProfileScreen() {
  // State for user data
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    contact: "+92 3470967396",
    gender: "Male",
    profilePicture: null as string | null,
  })

  // Update user data
  const updateUser = (data: Partial<typeof user>) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...data,
    }))
  }

  // Handle profile picture selection
  const handlePickImage = async () => {
    try {
      // Request permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

      if (status !== "granted") {
        Alert.alert("Permission needed", "Please grant permission to access your photos")
        return
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      })

      if (!result.canceled && result.assets && result.assets.length > 0) {
        updateUser({ profilePicture: result.assets[0].uri })
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image")
      console.log(error)
    }
  }

  // Handle field edits
  const handleEditField = (field: string, value: string) => {
    Alert.prompt(
      `Edit ${field}`,
      `Enter your ${field.toLowerCase()}`,
      (text) => {
        if (text) {
          updateUser({ [field.toLowerCase() as keyof typeof user]: text })
        }
      },
      "plain-text",
      value,
    )
  }

  // Handle gender selection
  const handleEditGender = () => {
    Alert.alert("Select Gender", "Choose your gender", [
      { text: "Male", onPress: () => updateUser({ gender: "Male" }) },
      { text: "Female", onPress: () => updateUser({ gender: "Female" }) },
      { text: "Other", onPress: () => updateUser({ gender: "Other" }) },
      { text: "Cancel", style: "cancel" },
    ])
  }

  // Render a profile item row
  const renderProfileItem = (label: string, value: string, onPress: () => void) => (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <Text style={styles.itemLabel}>{label}</Text>
      <View style={styles.itemValueContainer}>
        <Text style={styles.itemValue}>{value}</Text>
        <Text style={styles.chevron}>›</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My profile</Text>
      </View>

      {/* Profile Content */}
      <View style={styles.content}>
        {/* Profile Photo */}
        <TouchableOpacity style={styles.itemContainer} onPress={handlePickImage}>
          <Text style={styles.itemLabel}>Profile photo</Text>
          <View style={styles.itemValueContainer}>
            {user.profilePicture ? (
              <Image source={{ uri: user.profilePicture }} style={styles.profileImage} />
            ) : (
              <View style={styles.profilePhotoContainer}>
                <Text style={styles.profilePhotoText}>👤</Text>
              </View>
            )}
            <Text style={styles.chevron}>›</Text>
          </View>
        </TouchableOpacity>

        {/* Profile Details */}
        {renderProfileItem("Name", user.name, () => handleEditField("Name", user.name))}
        {renderProfileItem("Email", user.email, () => handleEditField("Email", user.email))}
        {renderProfileItem("Contact", user.contact, () => handleEditField("Contact", user.contact))}
        {renderProfileItem("Gender", user.gender, handleEditGender)}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    padding: 4,
  },
  backButtonText: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 12,
  },
  content: {
    marginTop: 16,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#fff",
    marginBottom: 1,
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  itemValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemValue: {
    fontSize: 16,
    color: "#666",
    marginRight: 8,
  },
  profilePhotoContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#4da6ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  profilePhotoText: {
    fontSize: 24,
    color: "#fff",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  chevron: {
    fontSize: 20,
    color: "#ccc",
  },
})

