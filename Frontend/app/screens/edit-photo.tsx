"use client"

import { useState } from "react"
import { View, Text, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"
import * as ImagePicker from "expo-image-picker"
import { Image, Camera } from "lucide-react-native"
import SuccessModal from "../components/success-modal"

export default function EditPhotoScreen() {
  const navigation = useNavigation()
  const [showSuccess, setShowSuccess] = useState(false)

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      // Here you would typically upload the image to your backend
      setShowSuccess(true)
    }
  }

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync()

    if (status === "granted") {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      })

      if (!result.canceled) {
        // Here you would typically upload the image to your backend
        setShowSuccess(true)
      }
    }
  }

  const handleSuccess = () => {
    setShowSuccess(false)
    navigation.goBack()
  }

  return (
    <View className="flex-1 bg-white p-4">
      <Pressable onPress={pickImage} className="flex-row items-center p-4 border border-gray-200 rounded-lg mb-4">
        <Image size={24} className="text-gray-600 mr-3" />
        <Text className="text-base">Choose from Gallery</Text>
      </Pressable>

      <Pressable onPress={takePhoto} className="flex-row items-center p-4 border border-gray-200 rounded-lg">
        <Camera size={24} className="text-gray-600 mr-3" />
        <Text className="text-base">Take Photo</Text>
      </Pressable>

      <SuccessModal visible={showSuccess} message="Image updated successfully" onClose={handleSuccess} />
    </View>
  )
}

