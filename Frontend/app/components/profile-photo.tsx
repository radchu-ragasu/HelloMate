import { Image, Pressable, View } from "react-native"
import { User } from "lucide-react-native"

interface ProfilePhotoProps {
  uri?: string | null
  size?: number
  onPress?: () => void
}

export default function ProfilePhoto({ uri, size = 100, onPress }: ProfilePhotoProps) {
  return (
    <Pressable onPress={onPress}>
      <View className="rounded-full overflow-hidden bg-gray-100" style={{ width: size, height: size }}>
        {uri ? (
          <Image source={{ uri }} className="w-full h-full" resizeMode="cover" />
        ) : (
          <View className="w-full h-full items-center justify-center">
            <User size={size * 0.6} className="text-gray-400" />
          </View>
        )}
      </View>
    </Pressable>
  )
}

