import React from "react";
import { View, ScrollView } from "react-native";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import ServiceGrid from "../components/ServiceGrid";
import FooterNav from "../components/Footer";

const Dashboard = () => {
  return (
    <View className="flex-1">
      <Header />
      <ScrollView>
        <SearchBar />
        <ServiceGrid />
      </ScrollView>
      <FooterNav />
    </View>
  );
};

export default Dashboard;
