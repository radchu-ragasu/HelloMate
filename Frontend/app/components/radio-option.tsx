import { View, Text, Pressable } from "react-native"

interface RadioOptionProps {
  label: string
  selected: boolean
  onSelect: () => void
}

export default function RadioOption({ label, selected, onSelect }: RadioOptionProps) {
  return (
    <Pressable onPress={onSelect} className="flex-row items-center py-4 px-6 border-b border-gray-100">
      <View
        className={`
        w-5 h-5 rounded-full border-2 mr-3
        ${selected ? "border-sky-500" : "border-gray-300"}
        items-center justify-center
      `}
      >
        {selected && <View className="w-3 h-3 rounded-full bg-sky-500" />}
      </View>
      <Text className="text-base">{label}</Text>
    </Pressable>
  )
}

