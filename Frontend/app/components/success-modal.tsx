import { View, Text, Modal, Pressable } from "react-native"
import { Check } from "lucide-react-native"

interface SuccessModalProps {
  visible: boolean
  message: string
  onClose: () => void
}

export default function SuccessModal({ visible, message, onClose }: SuccessModalProps) {
  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white rounded-lg p-6 m-4 items-center w-[80%]">
          <View className="w-12 h-12 rounded-full bg-sky-500 items-center justify-center mb-4">
            <Check size={24} color="white" />
          </View>
          <Text className="text-center text-base mb-4">{message}</Text>
          <Pressable onPress={onClose} className="bg-sky-500 py-2 px-8 rounded-md">
            <Text className="text-white font-medium">OK</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

