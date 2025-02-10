import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const FooterNav = () => {
  return (
    <View className="flex-row justify-around bg-white p-4 shadow-md">
      <TouchableOpacity>
        <Feather name="home" size={24} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Feather name="bell" size={24} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Feather name="shopping-cart" size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default FooterNav;
