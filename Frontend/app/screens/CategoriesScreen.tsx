import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Sample data for categories with local images
const categories = [
  { id: '1', name: 'Cleaning', image: require('../../assets/images/categories/cleaner.png') },
  { id: '2', name: 'Electrician', image: require('../../assets/images/categories/electrician.png') },
  { id: '3', name: 'Technician', image: require('../../assets/images/categories/technician.png') },
  { id: '4', name: 'Repairing', image: require('../../assets/images/categories/repairing.png') },
  { id: '5', name: 'Plumber', image: require('../../assets/images/categories/plumber.png') },
  { id: '6', name: 'Tutor', image: require('../../assets/images/categories/tutor.png') },
  { id: '7', name: 'Painting', image: require('../../assets/images/categories/painting.png') },
  { id: '8', name: 'Carpenter', image: require('../../assets/images/categories/carpenter.png') },
  { id: '9', name: 'Babysitter', image: require('../../assets/images/categories/babysitter.png') },
];

const CategoriesScreen = ({ navigation }: { navigation: any }) => {
  // Handle category selection
  const handleCategoryPress = (category: { name: string, image: any }) => {
    navigation.navigate('OrderForm', { category }); // Pass the entire category object including image
  };

  const renderCategoryItem = ({ item }: { item: { name: string, image: any } }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => handleCategoryPress(item)}
    >
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryText} numberOfLines={1} ellipsizeMode="tail">
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />

      <View style={styles.container}>
        <Text style={styles.title}>Categories</Text>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          numColumns={3}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  categoryItem: {
    width: '32%',
    margin: '1%',
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
    overflow: 'hidden',
  },
  categoryImage: {
    width: '100%',
    height: 60,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: 'contain',
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
    fontWeight: "600",
    marginVertical: 8,
    paddingHorizontal: 8,
    width: '100%',
    textAlign: 'center',
    overflow: 'hidden',
  },
});

export default CategoriesScreen;