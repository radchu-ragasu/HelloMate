"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useUser } from "../context/UserContext"

const genderOptions = ["Male", "Female", "Other", "Prefer not to say"]


export default function EditGenderScreen() {
  const navigation = useNavigation()
  const { user, updateUser } = useUser()
  const [selectedGender, setSelectedGender] = useState(user.gender)

  const handleSave = () => {
    updateUser({ gender: selectedGender })
    navigation.goBack()
  }

  const renderGenderOption = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[styles.optionContainer, selectedGender === item && styles.selectedOption]}
      onPress={() => setSelectedGender(item)}
    >
      <Text style={styles.optionText}>{item}</Text>
      {selectedGender === item && <Ionicons name="checkmark" size={20} color="#4da6ff" />}
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Gender</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <FlatList
          data={genderOptions}
          renderItem={renderGenderOption}
          keyExtractor={(item) => item}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
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
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  saveButton: {
    padding: 4,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4da6ff",
  },
  content: {
    marginTop: 16,
    backgroundColor: "#fff",
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  selectedOption: {
    backgroundColor: "#f0f8ff",
  },
  optionText: {
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
    marginLeft: 16,
  },
})

