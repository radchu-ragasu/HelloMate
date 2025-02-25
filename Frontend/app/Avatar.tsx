import { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

interface AvatarProps {
  size?: number;
  onImageSelected?: (uri: string) => void;
  currentImage?: string | null;
}

export default function Avatar({ size = 100, onImageSelected, currentImage }: AvatarProps) {
  const [image, setImage] = useState<string | null>(currentImage || null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      setImage(result.assets[0].uri);
      onImageSelected?.(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      setImage(result.assets[0].uri);
      onImageSelected?.(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.avatarContainer, { width: size, height: size }]}>
        {image ? (
          <Image source={{ uri: image }} style={styles.avatar} />
        ) : (
          <Ionicons name="person" size={size * 0.6} color="#A5A5A5" />
        )}
      </View>
      {/* <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Ionicons name="images-outline" size={24} color="#666" />
          <Text style={styles.buttonText}>Choose from Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Ionicons name="camera-outline" size={24} color="#666" />
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  avatarContainer: {
    backgroundColor: '#E1E1E1',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 20,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    width: '100%',
    gap: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8,
    gap: 10,
  },
  buttonText: {
    color: '#666',
    fontSize: 16,
  },
});