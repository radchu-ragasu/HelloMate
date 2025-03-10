

// "use client"

// import { useState } from "react"
// import {
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Alert,
//   Text, // Added Text import here
// } from "react-native"
// import { launchImageLibrary, type ImageLibraryOptions } from "react-native-image-picker"
// import { useUser } from "../context/UserContext"

// export default function ProfilePhotoSelector() {
//   const { user, updateUser } = useUser()
//   const [uploading, setUploading] = useState(false)

//   const pickImage = async () => {
//     try {
//       setUploading(true)

//       const options: ImageLibraryOptions = {
//         mediaType: "photo",
//         includeBase64: false,
//         maxHeight: 500,
//         maxWidth: 500,
//         quality: 0.8,
//       }

//       // Using the Promise-based API
//       const result = await launchImageLibrary(options)

//       if (result.didCancel) {
//         console.log("User cancelled image picker")
//       } else if (result.errorCode) {
//         console.log("ImagePicker Error: ", result.errorMessage)
//         Alert.alert("Error", "Failed to pick image")
//       } else if (result.assets && result.assets.length > 0) {
//         const asset = result.assets[0]
//         updateUser({ profilePicture: asset.uri })
//       }
//     } catch (error) {
//       Alert.alert("Error", "Failed to pick image")
//       console.log(error)
//     } finally {
//       setUploading(false)
//     }
//   }

//   return (
//     <TouchableOpacity style={styles.container} onPress={pickImage} disabled={uploading}>
//       {user.profilePicture ? (
//         <Image source={{ uri: user.profilePicture }} style={styles.profileImage} />
//       ) : (
//         <View style={styles.placeholderContainer}>
//           <Text style={styles.placeholderText}>👤</Text>
//         </View>
//       )}
//     </TouchableOpacity>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     marginRight: 8,
//   },
//   profileImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//   },
//   placeholderContainer: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: "#4da6ff",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   placeholderText: {
//     fontSize: 24,
//     color: "#fff",
//   },
// })


import { View, StyleSheet, TouchableOpacity, Image, Alert, Text } from "react-native"
import { useUser } from "../context/UserContext"

export default function ProfilePhotoSelector() {
  const { user, updateUser } = useUser()

  // Simulate picking an image by using a placeholder
  const simulatePickImage = () => {
    // For testing, just use a placeholder image URL
    const placeholderImageUrl = "https://via.placeholder.com/150"
    updateUser({ profilePicture: placeholderImageUrl })
    Alert.alert("Success", "Profile picture updated (simulated)")
  }

  return (
    <TouchableOpacity style={styles.container} onPress={simulatePickImage}>
      {user.profilePicture ? (
        <Image source={{ uri: user.profilePicture }} style={styles.profileImage} />
      ) : (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>👤</Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginRight: 8,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  placeholderContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#4da6ff",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 24,
    color: "#fff",
  },
})

