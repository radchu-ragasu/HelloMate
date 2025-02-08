import React from "react";
import { View, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";

const SearchBar = () => {
  return (
    <View className="flex-row items-center p-3 bg-gray-100 rounded-xl mx-4">
      <Feather name="search" size={20} className="mr-2" />
      <TextInput
        placeholder="Search services..."
        className="flex-1 text-base"
      />
    </View>
  );
};

export default SearchBar;
