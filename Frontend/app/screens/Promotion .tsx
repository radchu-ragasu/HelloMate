import React from "react";
import { View, ScrollView } from "react-native";
import Header from "../components/Header";
import FooterNav from "../components/Footer";

const PromoScreen = () => {
  return (
    <View className="flex-1">
      <Header />

      <FooterNav />
    </View>
  );
};

export default PromoScreen;
