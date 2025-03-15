import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Image } from "react-native"
import { useUser } from "../context/UserContext"
import * as ImagePicker from "expo-image-picker"

export default function ProfileScreen() {
  const { user, updateUser } = useUser()
  

  const pickImage = async () => {
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
  }

  const handleEditField = (field: string, value: string) => {
    Alert.prompt(
      `Edit ${field}`,
      `Enter your ${field.toLowerCase()}`,
      (text) => {
        if (text) {
          updateUser({ [field.toLowerCase()]: text })
        }
      },
      "plain-text",
      value,
    )
  }

  const handleEditGender = () => {
    Alert.alert("Select Gender", "Choose your gender", [
      { text: "Male", onPress: () => updateUser({ gender: "Male" }) },
      { text: "Female", onPress: () => updateUser({ gender: "Female" }) },
      { text: "Other", onPress: () => updateUser({ gender: "Other" }) },
      { text: "Cancel", style: "cancel" },
    ])
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My profile</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.photoContainer} onPress={pickImage}>
          <Text style={styles.photoLabel}>Profile photo</Text>
          <View style={styles.photoValueContainer}>
            {user.profilePicture ? (
              <Image source={{ uri: user.profilePicture }} style={styles.profileImage} />
            ) : (
              <View style={styles.placeholderContainer}>
                <Text style={styles.placeholderText}>👤</Text>
              </View>
            )}
            <Text style={styles.chevron}>›</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemContainer} onPress={() => handleEditField("Name", user.name)}>
          <Text style={styles.itemLabel}>Name</Text>
          <View style={styles.itemValueContainer}>
            <Text style={styles.itemValue}>{user.name}</Text>
            <Text style={styles.chevron}>›</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemContainer} onPress={() => handleEditField("Email", user.email)}>
          <Text style={styles.itemLabel}>Email</Text>
          <View style={styles.itemValueContainer}>
            <Text style={styles.itemValue}>{user.email}</Text>
            <Text style={styles.chevron}>›</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemContainer} onPress={() => handleEditField("Contact", user.contact)}>
          <Text style={styles.itemLabel}>Contact</Text>
          <View style={styles.itemValueContainer}>
            <Text style={styles.itemValue}>{user.contact}</Text>
            <Text style={styles.chevron}>›</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemContainer} onPress={handleEditGender}>
          <Text style={styles.itemLabel}>Gender</Text>
          <View style={styles.itemValueContainer}>
            <Text style={styles.itemValue}>{user.gender}</Text>
            <Text style={styles.chevron}>›</Text>
          </View>
        </TouchableOpacity>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 12,
  },
  content: {
    marginTop: 16,
  },
  photoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#fff",
    marginBottom: 1,
  },
  photoLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  photoValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  placeholderContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#4da6ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  placeholderText: {
    fontSize: 24,
    color: "#fff",
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
  chevron: {
    fontSize: 20,
    color: "#ccc",
  },
})

