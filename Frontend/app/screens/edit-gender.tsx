"use client"

import { useState } from "react"
import { View, Pressable, Text } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { RootStackParamList, Gender } from "..//types"
import RadioOption from "../components/radio-option"
import SuccessModal from "../components/success-modal"

type Props = NativeStackScreenProps<RootStackParamList, "EditGender">
//
const GENDER_OPTIONS: Gender[] = ["Male", "Female", "Other"]

export default function EditGenderScreen() {
  const navigation = useNavigation()
  const route = useRoute<Props["route"]>()
  const [gender, setGender] = useState<Gender>(route.params.currentGender as Gender)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSave = () => {
    // Here you would typically update the gender in your backend
    setShowSuccess(true)
  }

  const handleSuccess = () => {
    setShowSuccess(false)
    navigation.goBack()
  }

  return (
    <View className="flex-1 bg-white">
      <View className="border-t border-gray-100">
        {GENDER_OPTIONS.map((option) => (
          <RadioOption key={option} label={option} selected={gender === option} onSelect={() => setGender(option)} />
        ))}
      </View>

      <View className="p-4 mt-4">
        <Pressable onPress={handleSave} className="bg-sky-500 py-3 px-6 rounded-lg items-center">
          <Text className="text-white font-medium text-base">Save</Text>
        </Pressable>
      </View>

      <SuccessModal visible={showSuccess} message="Gender updated successfully" onClose={handleSuccess} />
    </View>
  )
}

