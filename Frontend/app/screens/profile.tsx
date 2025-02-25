"use client"

import { useState } from "react"
import { View, Text, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { ChevronRight } from "lucide-react-native"
import type { RootStackParamList, Gender } from "../types"
import ProfilePhoto from "../components/profile-photo"

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Profile">

export default function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenNavigationProp>()
  const [name, setName] = useState("John Doe")
  const [phone, setPhone] = useState("+1 234-567-8900")
  const [gender, setGender] = useState<Gender>("Male")
  const [photoUri, setPhotoUri] = useState<string | null>(null)

  return (
    <View className="flex-1 bg-white">
      <View className="items-center mt-8 mb-6">
        <ProfilePhoto uri={photoUri} onPress={() => navigation.navigate("EditPhoto")} />
      </View>

      <View className="px-4">
        <Pressable
          onPress={() => navigation.navigate("EditName", { currentName: name })}
          className="flex-row items-center justify-between py-4 border-b border-gray-200"
        >
          <View>
            <Text className="text-sm text-gray-500 mb-1">Name</Text>
            <Text className="text-base">{name}</Text>
          </View>
          <ChevronRight size={20} className="text-gray-400" />
        </Pressable>

        <View className="py-4 border-b border-gray-200">
          <Text className="text-sm text-gray-500 mb-1">Email</Text>
          <Text className="text-base">john.doe@example.com</Text>
        </View>

        <Pressable
          onPress={() => navigation.navigate("EditPhone", { currentPhone: phone })}
          className="flex-row items-center justify-between py-4 border-b border-gray-200"
        >
          <View>
            <Text className="text-sm text-gray-500 mb-1">Contact</Text>
            <Text className="text-base">{phone}</Text>
          </View>
          <ChevronRight size={20} className="text-gray-400" />
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("EditGender", { currentGender: gender })}
          className="flex-row items-center justify-between py-4 border-b border-gray-200"
        >
          <View>
            <Text className="text-sm text-gray-500 mb-1">Gender</Text>
            <Text className="text-base">{gender}</Text>
          </View>
          <ChevronRight size={20} className="text-gray-400" />
        </Pressable>
      </View>
    </View>
  )
}

