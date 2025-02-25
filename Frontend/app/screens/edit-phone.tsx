"use client"

import { useState } from "react"
import { View, Text, TextInput, Pressable } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { RootStackParamList } from "../types"
import SuccessModal from "../components/success-modal"

type Props = NativeStackScreenProps<RootStackParamList, "EditPhone">

export default function EditPhoneScreen() {
  const navigation = useNavigation()
  const route = useRoute<Props["route"]>()
  const [phone, setPhone] = useState(route.params.currentPhone)
  const [showSuccess, setShowSuccess] = useState(false)

  const formatPhoneNumber = (text: string) => {
    // Remove all non-numeric characters
    const cleaned = text.replace(/\D/g, "")
    // Format as needed (this is a simple example)
    return cleaned
  }

  const handlePhoneChange = (text: string) => {
    const formatted = formatPhoneNumber(text)
    setPhone(formatted)
  }

  const handleSave = () => {
    // Here you would typically update the phone in your backend
    setShowSuccess(true)
  }

  const handleSuccess = () => {
    setShowSuccess(false)
    navigation.goBack()
  }

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-sm text-gray-500 mb-2">Phone Number</Text>
      <TextInput
        value={phone}
        onChangeText={handlePhoneChange}
        keyboardType="phone-pad"
        className="border border-gray-200 rounded-lg p-4 text-base mb-6"
        placeholder="Enter your phone number"
      />

      <Pressable onPress={handleSave} className="bg-sky-500 py-3 px-6 rounded-lg items-center">
        <Text className="text-white font-medium text-base">Save</Text>
      </Pressable>

      <SuccessModal visible={showSuccess} message="Phone number updated successfully" onClose={handleSuccess} />
    </View>
  )
}

