"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useAuth } from "../context/AuthContext"

const EditNameScreen = () => {
  const navigation = useNavigation()
  const { profile, updateProfile } = useAuth()
  const [name, setName] = useState(profile?.name || "")
  const [updating, setUpdating] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleUpdateName = async () => {
    if (!name.trim()) return

    try {
      setUpdating(true)
      await updateProfile({ name: name.trim() })
      setUpdating(false)
      setSuccess(true)

      // Navigate back after a short delay
      setTimeout(() => {
        navigation.goBack()
      }, 1500)
    } catch (error) {
      console.error("Error updating name:", error)
      setUpdating(false)
    }
  }

  if (success) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.successContainer}>
          <View style={styles.successIconContainer}>
            <Text style={styles.successIcon}>✓</Text>
          </View>
          <Text style={styles.successText}>Name updated Successfully</Text>
          <TouchableOpacity style={styles.okButton} onPress={() => navigation.goBack()}>
            <Text style={styles.okButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>‹ Edit Name</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            autoCapitalize="words"
            autoFocus
          />
        </View>

        <TouchableOpacity
          style={[styles.updateButton, (!name.trim() || updating) && styles.disabledButton]}
          onPress={handleUpdateName}
          disabled={!name.trim() || updating}
        >
          <Text style={styles.updateButtonText}>{updating ? "Updating..." : "Update"}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E1E8ED",
  },
  backButton: {
    fontSize: 16,
    color: "#1DA1F2",
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 24,
    padding: 4,
  },
  input: {
    fontSize: 16,
    padding: 12,
  },
  updateButton: {
    backgroundColor: "#4C9EEB",
    borderRadius: 4,
    padding: 12,
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 24,
  },
  disabledButton: {
    backgroundColor: "#AAB8C2",
  },
  updateButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  successContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  successIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4C9EEB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  successIcon: {
    fontSize: 30,
    color: "#FFFFFF",
  },
  successText: {
    fontSize: 16,
    color: "#14171A",
    marginBottom: 24,
  },
  okButton: {
    backgroundColor: "#4C9EEB",
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 40,
    alignItems: "center",
  },
  okButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
})

export default EditNameScreen

