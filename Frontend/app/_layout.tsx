// import { Stack } from "expo-router";

// export default function RootLayout() {
//   return (
//         <Stack screenOptions={{headerShown: false}}>
    
//         </Stack>
//           );
// }





// import { useState } from 'react';
// import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';
// import Avatar from './Avatar';

// interface ProfileField {
//   label: string;
//   value: string;
//   icon: keyof typeof Ionicons.glyphMap;
// }

// export default function ProfileScreen() {
//   const navigation = useNavigation();
//   const [profileImage, setProfileImage] = useState<string | null>(null);

//   const fields: ProfileField[] = [
//     { label: 'Name', value: '', icon: 'person-outline' },
//     { label: 'Email', value: '', icon: 'mail-outline' },
//     { label: 'Contact', value: '+92 3470967396', icon: 'call-outline' },
//     { label: 'Gender', value: '', icon: 'male-female-outline' },
//   ];

//   const handleEditPhoto = () => {
//     navigation.navigate('EditPhoto' as never);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="chevron-back" size={24} color="#000" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>My profile</Text>
//       </View>

//       <TouchableOpacity style={styles.photoSection} onPress={handleEditPhoto}>
//         <Text style={styles.label}>Profile photo</Text>
//         <View style={styles.photoContainer}>
//           <Avatar size={50} currentImage={profileImage} />
//           <Ionicons name="chevron-forward" size={24} color="#C7C7CC" />
//         </View>
//       </TouchableOpacity>

//       {fields.map((field, index) => (
//         <TouchableOpacity key={index} style={styles.field}>
//           <Text style={styles.label}>{field.label}</Text>
//           <View style={styles.valueContainer}>
//             <Text style={styles.value}>{field.value || field.label}</Text>
//             <Ionicons name="chevron-forward" size={24} color="#C7C7CC" />
//           </View>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E5E5',
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginLeft: 16,
//   },
//   photoSection: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E5E5',
//   },
//   photoContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//   },
//   field: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E5E5',
//   },
//   label: {
//     fontSize: 16,
//     color: '#000',
//   },
//   valueContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//   },
//   value: {
//     fontSize: 16,
//     color: '#8E8E93',
//   },
// });


// import React from "react";
// import { createStackNavigator } from "@react-navigation/stack";
// import CategoriesScreen from "./screens/CategoriesScreen";


// const Stack = createStackNavigator();

// const PlaceOrderStack = () => {
//     return (
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//             <Stack.Screen name="PlaceOrder" component={CategoriesScreen}/>

//         </Stack.Navigator>
//     )
// }

// export default PlaceOrderStack; 

import PlaceOrderStack from "./navigation/PlaceOrderStack";

export default function RootLayout() {
  return <PlaceOrderStack />;
}
