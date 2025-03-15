// screens/Dashboard.tsx
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import ServiceGrid from "../components/ServiceGrid";
import FooterNav from "../components/Footer";
//
const Dashboard = () => {
  return (
    <View style={styles.container}>
      <Header />

      <ScrollView>
        <SearchBar />
        <ServiceGrid />
      </ScrollView>

      <FooterNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Dashboard;
