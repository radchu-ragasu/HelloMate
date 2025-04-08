import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';


// Define the ErrorScreen component
const ErrorScreen = () => {
  // Get the router object to handle navigation
  const router = useRouter();

  // Get the errorMessage passed through route parameters (if any)
  const { errorMessage } = useLocalSearchParams<{ errorMessage?: string }>();

  // Set the error message, use a default message if none is passed
  const message = errorMessage || "We couldn't submit your report. Please check your connection and try again.";

  return (
    <View style={styles.container}>
      {/* Header section with a back button and title */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Error</Text>
        <View style={styles.placeholder} /> {/* Just to balance spacing */}
      </View>

      {/* Content section with the error card and retry button */}
      <View style={styles.content}>
        <View style={styles.card}>
          {/* Error icon */}
          <Ionicons name="warning-outline" size={48} color="#FF4D4F" style={styles.cardIcon} />
          {/* Title and message for the error */}
          <Text style={styles.title}>Oops! Something Went Wrong</Text>
          <Text style={styles.message}>{message}</Text>
        </View>

        {/* Retry button that goes back when pressed */}
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => router.back()}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
          <Ionicons name="refresh" size={20} color="#fff" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
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
    color: '#333',
  },
  placeholder: {
    width: 24,
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
    maxWidth: 400,
  },
  cardIcon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  retryButton: {
    flexDirection: 'row',
    backgroundColor: '#4A7AFF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginRight: 8,
  },
  buttonIcon: {
    marginLeft: 4,
  },
});

export default ErrorScreen;
