import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert,
  Modal,
  ActivityIndicator,
  SafeAreaView,
  TextInput,
  Image,
  ScrollView
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';

type RootStackParamList = {
  Categories: undefined;
  OrderForm: { category: { name: string, image: any } }; // Image is the require() reference
};

type OrderFormScreenRouteProp = RouteProp<RootStackParamList, 'OrderForm'>;

type OrderFormProps = {
  route: OrderFormScreenRouteProp;
  navigation: any;
};

const OrderFormScreen = ({ route, navigation }: OrderFormProps) => {
  const { category } = route.params;

  const [details, setDetails] = useState('');
  const [address, setAddress] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [locatingUser, setLocatingUser] = useState(false);
  const [mapRegion, setMapRegion] = useState(null);

  const isFormComplete = details && address;

  const handlePlaceOrder = async () => {
    if (!isFormComplete) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/place', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: '12345',
          category: category.name,
          description: details,
          address,
          photos,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.errors?.join('\n') || 'Something went wrong');
      }

      Alert.alert('Success', 'Your order has been placed successfully!');
      navigation.navigate('Categories');
    } catch (error) {
      Alert.alert('Error', (error as Error).message || 'Failed to connect to the server');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = async () => {
    setLocatingUser(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required');
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const { latitude, longitude } = location.coords;

      const addressResponse = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (addressResponse?.length > 0) {
        const addressObj = addressResponse[0];
        const formattedAddress = [
          addressObj.name,
          addressObj.street,
          addressObj.city,
          addressObj.region,
          addressObj.postalCode,
          addressObj.country,
        ].filter(Boolean).join(', ');

        setAddress(formattedAddress);
        setMapRegion({
          latitude,
          longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
      }

      setLocationModalVisible(true);
    } catch (error) {
      Alert.alert('Error', 'Failed to get location');
    } finally {
      setLocatingUser(false);
    }
  };

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setMapRegion({
      ...mapRegion,
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    });

    Location.reverseGeocodeAsync(coordinate).then((addressResponse) => {
      if (addressResponse?.length > 0) {
        const addressObj = addressResponse[0];
        const formattedAddress = [
          addressObj.name,
          addressObj.street,
          addressObj.city,
          addressObj.region,
          addressObj.postalCode,
          addressObj.country,
        ].filter(Boolean).join(', ');
        setAddress(formattedAddress);
      }
    });
  };

  const handleAddPhotos = async () => {
    if (photos.length >= 3) {
      Alert.alert('Maximum reached', 'You can only add up to 3 images.');
      return;
    }

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        selectionLimit: 3 - photos.length,
        quality: 1,
      });

      if (!result.canceled) {
        const selectedPhotos = result.assets.map((asset) => asset.uri);
        setPhotos([...photos, ...selectedPhotos]);
      }
    } else {
      Alert.alert('Permission required', 'Please grant permission to access the media library.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Place order</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionLabel}>Category</Text>
        <View style={styles.categoryCard}>
          <Image 
            source={category.image}
            style={styles.categoryImage}
          />
          <Text style={styles.categoryName}>{category.name}</Text>
        </View>

        <View style={styles.inputField}>
          <Ionicons name="location-outline" size={22} color="#666" />
          <TextInput
            style={[styles.inputText, !address && styles.placeholderText]}
            placeholder="Add address"
            value={address}
            onChangeText={setAddress}
          />
          <TouchableOpacity 
            onPress={getCurrentLocation} 
            disabled={locatingUser}
            style={styles.locationIcon}
          >
            {locatingUser ? (
              <ActivityIndicator size="small" color="#666" />
            ) : (
              <Ionicons name="locate" size={22} color="#666" />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.inputField}>
          <Ionicons name="document-text-outline" size={22} color="#666" />
          <TextInput
            style={[styles.inputText, !details && styles.placeholderText]}
            placeholder="Add details"
            value={details}
            onChangeText={setDetails}
            multiline
          />
        </View>

        <TouchableOpacity 
          style={styles.inputField}
          onPress={handleAddPhotos}
        >
          <Ionicons name="image-outline" size={22} color="#666" />
          <Text style={[styles.inputText, photos.length === 0 && styles.placeholderText]}>
            {photos.length > 0 ? `${photos.length} photos added` : 'Add photos'}
          </Text>
        </TouchableOpacity>

        <ScrollView horizontal style={styles.photosContainer}>
          {photos.map((photo, index) => (
            <Image key={index} source={{ uri: photo }} style={styles.photoThumbnail} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.confirmButton, !isFormComplete && styles.disabledButton]} 
          onPress={handlePlaceOrder}
          disabled={!isFormComplete || loading}
        >
          <Text style={styles.confirmButtonText}>
            {loading ? 'Placing Order...' : 'Confirm Order'}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={locationModalVisible}
        onRequestClose={() => setLocationModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={() => setLocationModalVisible(false)} 
              style={styles.backButton}
            >
              <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Confirm Location</Text>
            <View style={styles.placeholder} />
          </View>

          {mapRegion?.latitude && (
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                region={mapRegion}
                onPress={handleMapPress}
              >
                <Marker
                  coordinate={{
                    latitude: mapRegion.latitude,
                    longitude: mapRegion.longitude,
                  }}
                  draggable
                  onDragEnd={handleMapPress}
                />
              </MapView>
            </View>
          )}

          <View style={styles.modalFooter}>
            <TouchableOpacity 
              style={styles.confirmButton}
              onPress={() => setLocationModalVisible(false)}
            >
              <Text style={styles.confirmButtonText}>Confirm Location</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F9FF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F9',
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 24,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 24,
  },
  categoryImage: {
    width: 40,
    height: 40,
    marginRight: 12,
    resizeMode: 'contain',
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2F9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
  },
  placeholderText: {
    color: '#999',
  },
  locationIcon: {
    padding: 4,
  },
  footer: {
    padding: 16,
  },
  confirmButton: {
    backgroundColor: '#4A7AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#C5D1E8',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F6F9FF',
  },
  mapContainer: {
    flex: 1,
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  modalFooter: {
    padding: 16,
  },
  photosContainer: {
    marginVertical: 10,
  },
  photoThumbnail: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default OrderFormScreen;