import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define your order data type
interface OrderData {
  id: string;
  status: string;
  address: string;
  serviceType: string;
  orderDate: string;
  details: string;
  attachments?: string[];
}

// Define your navigation parameter list type
type RootStackParamList = {
  OrderScreen6: { orderData: OrderData };
  Home: undefined;
  // Add other screens as needed
};

// Define the props for your component
type OrderScreen6Props = {
  route: RouteProp<RootStackParamList, 'OrderScreen6'>;
  navigation: StackNavigationProp<RootStackParamList, any>;
};

const OrderScreen6 = ({ route, navigation }: OrderScreen6Props) => {
  // Initial state would come from your API or route params
  const [orderStatus, setOrderStatus] = useState<'Pending' | 'Accepted' | 'Cancelled'>('Pending');
  const { orderData } = route.params;
  
  // Set initial status from orderData if available
  useEffect(() => {
    if (orderData?.status) {
      setOrderStatus(orderData.status as 'Pending' | 'Accepted' | 'Cancelled');
    }
  }, [orderData]);
  
  // Status colors for visual indication
  const getStatusColor = (): string => {
    switch(orderStatus) {
      case 'Pending': return '#3498db';
      case 'Accepted': return '#2ecc71';
      case 'Cancelled': return '#e74c3c';
      default: return '#3498db';
    }
  };
  
  // Function to update order status (would connect to your backend)
  const updateOrderStatus = async (newStatus: 'Pending' | 'Accepted' | 'Cancelled'): Promise<void> => {
    try {
      // Mock API call - replace with your actual API call
      // await api.updateOrderStatus(orderData.id, newStatus);
      
      // Update local state if API call successful
      setOrderStatus(newStatus);
    } catch (error) {
      console.error('Failed to update order status:', error);
      // Handle error (show error message to user)
    }
  };

  // Get status message based on current status
  const getStatusMessage = (): string => {
    switch(orderStatus) {
      case 'Pending': 
        return 'We have received your order and will get back to you as soon as the order is reviewed.';
      case 'Accepted': 
        return 'Your order has been accepted. A service provider will contact you shortly.';
      case 'Cancelled': 
        return 'Your order has been cancelled.';
      default: 
        return '';
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{'<'} Order Detail</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.circle} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.statusContainer}>
        <Text>Order Status</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
          <Text style={styles.statusText}>{orderStatus}</Text>
        </View>
      </View>
      
      <Text style={styles.statusMessage}>
        {getStatusMessage()}
      </Text>
      
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionLabel}>Address:</Text>
        <Text style={styles.sectionContent}>{orderData.address || '125, 2nd street, California, 19288'}</Text>
      </View>
      
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionLabel}>Service Type</Text>
        <View style={styles.serviceIconsContainer}>
          <View style={styles.serviceIcon}>
            <Image 
              source={require('../../assets/images/img1.jpg')} 
              style={styles.iconImage} 
            />
            <Text style={styles.iconText}>Cleaning</Text>
          </View>
          <View style={styles.serviceIcon}>
            <Image 
              source={require('../../assets/images/img2.jpg')} 
              style={styles.iconImage} 
            />
            <Text style={styles.iconText}>Repairing</Text>
          </View>
          <View style={styles.serviceIcon}>
            <Image 
              source={require('../../assets/images/img3.jpg')} 
              style={styles.iconImage} 
            />
            <Text style={styles.iconText}>CheckUp</Text>
          </View>
          <View style={styles.serviceIcon}>
            <Image 
              source={require('../../assets/images/img4.jpg')} 
              style={styles.iconImage} 
            />
            <Text style={styles.iconText}>Carpenter</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionLabel}>Order Date</Text>
        <Text style={styles.sectionContent}>{orderData.orderDate || '20 December 12:00 PM'}</Text>
      </View>
      
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionLabel}>Details</Text>
        <Text style={styles.sectionContent}>
          {orderData.details || 'There are no limits in the world of Hello Mate. You can be both a customer and a helper. For more you can press show more.'}
        </Text>
        <TouchableOpacity>
          <Text style={styles.showMore}>Show more</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionLabel}>Attachments</Text>
        <ScrollView horizontal style={styles.attachmentsScroll}>
          {(orderData.attachments || [1, 2, 3, 4, 5]).map((item, index) => (
            <View key={index} style={styles.attachmentItem}>
              <Image 
                source={require('../../assets/images/img1.jpg')} 
                style={styles.attachmentImage} 
              />
            </View>
          ))}
        </ScrollView>
      </View>
      
      {/* Admin controls - only show for admins or service providers */}
      {orderStatus === 'Pending' && (
        <View style={styles.adminControls}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.acceptButton]}
            onPress={() => updateOrderStatus('Accepted')}>
            <Text style={styles.buttonText}>Accept Order</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.cancelButton]}
            onPress={() => updateOrderStatus('Cancelled')}>
            <Text style={styles.buttonText}>Cancel Order</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {/* Help dialog - similar to what's shown in your second screenshot */}
      {orderStatus === 'Pending' && (
        <View style={styles.helpDialog}>
          <View style={styles.iconCircle}>
            <Image 
              source={require('../../assets/images/image.png')} 
              style={styles.phoneIcon} 
            />
          </View>
          <Text style={styles.helpTitle}>Do you need any Help?</Text>
          <Text style={styles.helpText}>
            After confirmation, we are going to assign workers for your order.
          </Text>
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Contact</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
  },
  backButton: {
    fontSize: 16,
    fontWeight: '500',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ccc',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
  },
  statusMessage: {
    marginBottom: 20,
    color: '#666',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionContent: {
    color: '#333',
  },
  serviceIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  serviceIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 5,
  },
  iconImage: {
    width: 30,
    height: 30,
    marginBottom: 5,
  },
  iconText: {
    fontSize: 10,
    textAlign: 'center',
  },
  showMore: {
    color: '#3498db',
    marginTop: 5,
    textAlign: 'right',
  },
  attachmentsScroll: {
    marginTop: 10,
  },
  attachmentItem: {
    marginRight: 10,
  },
  attachmentImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  adminControls: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: '#2ecc71',
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  helpDialog: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  phoneIcon: {
    width: 30,
    height: 30,
    tintColor: 'white',
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  helpText: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  contactButton: {
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  contactButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default OrderScreen6;