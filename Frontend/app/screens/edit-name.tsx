"use client"

import { useState } from "react"
import { View, Text, TextInput, Pressable } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { RootStackParamList } from "..//types"
import SuccessModal from "../components/success-modal"

type Props = NativeStackScreenProps<RootStackParamList, "EditName">

export default function EditNameScreen() {
  const navigation = useNavigation()
  const route = useRoute<Props["route"]>()
  const [name, setName] = useState(route.params.currentName)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSave = () => {
    // Here you would typically update the name in your backend
    setShowSuccess(true)
  }

  const handleSuccess = () => {
    setShowSuccess(false)
    navigation.goBack()
  }

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-sm text-gray-500 mb-2">Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        className="border border-gray-200 rounded-lg p-4 text-base mb-6"
        placeholder="Enter your name"
      />

      <Pressable onPress={handleSave} className="bg-sky-500 py-3 px-6 rounded-lg items-center">
        <Text className="text-white font-medium text-base">Save</Text>
      </Pressable>

      <SuccessModal visible={showSuccess} message="Name updated successfully" onClose={handleSuccess} />
    </View>
  )
}

