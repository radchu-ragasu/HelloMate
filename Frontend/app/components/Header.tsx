import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const Header = () => {
  return (
    <View className="flex-row items-center justify-between p-4 bg-white shadow-md">
      <Text className="text-lg font-bold">Dashboard</Text>
      <TouchableOpacity>
        <Feather name="menu" size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
