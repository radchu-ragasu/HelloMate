import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const FooterNav = () => {
  return (
    <View style={{flexDirection:"column", justifyContent:"space-around",backgroundColor:"#000",shadowRadius:4,}}>
      <TouchableOpacity>
        <Feather name="home" size={24} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Feather name="shopping-cart" size={24} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Feather name="bell" size={24} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Feather name="box" size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default FooterNav;
