import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';


type RootStackParamList = {
  ReportProblemScreen: undefined;
  ErrorScreen: { errorMessage?: string };
  ConfirmationScreen: undefined;
};

type ReportProblemNavigationProp = StackNavigationProp<RootStackParamList, 'ReportProblemScreen'>;

interface ReportProblemProps {
  navigation: ReportProblemNavigationProp;
}

const ReportProblemScreen = ({ navigation }: ReportProblemProps) => {
  const [category, setCategory] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
  if (!description || !category) {
    navigation.navigate('ErrorScreen', { errorMessage: 'Category and description are required.' });
    return;
  }

  setLoading(true);

  try {
    const response = await fetch('http://localhost:3000/report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category,
        description,
        email,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.errors?.join(', ') || data.error || 'An unexpected error occurred.';
      throw new Error(errorMessage);
    }

    console.log('Report submitted successfully:', data);
    navigation.navigate('ConfirmationScreen');
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'An unknown error occurred';
      navigation.navigate('ErrorScreen', { errorMessage: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report a Problem</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <View style={styles.pickerContainer}>
          <Ionicons name="list-outline" size={22} color="#666" style={styles.icon} />
          <RNPickerSelect
            onValueChange={(value) => setCategory(value)}
            items={[
              { label: 'Bug', value: 'Bug' },
              { label: 'Feature Request', value: 'Feature Request' },
              { label: 'Usability', value: 'Usability' },
              { label: 'Other', value: 'Other' },
            ]}
            value={category}
            style={pickerSelectStyles}
            placeholder={{ label: 'Select Category', value: null }}
            useNativeAndroidPickerStyle={false}
          />
        </View>

        <View style={styles.inputField}>
          <Ionicons name="document-text-outline" size={22} color="#666" style={styles.icon} />
          <TextInput
            style={[styles.inputText, !description && styles.placeholderText]}
            multiline
            placeholder="Describe the problem in detail..."
            value={description}
            onChangeText={setDescription}
            editable={!loading}
          />
        </View>

        <View style={styles.inputField}>
          <Ionicons name="mail-outline" size={22} color="#666" style={styles.icon} />
          <TextInput
            style={[styles.inputText, !email && styles.placeholderText]}
            placeholder="Your email (optional)"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            editable={!loading}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.submitButton, (!description || !category || loading) && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={!description || !category || loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Submit</Text>
          )}
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
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2F9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2F9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  icon: {
    marginRight: 12,
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  placeholderText: {
    color: '#999',
  },
  footer: {
    padding: 16,
  },
  submitButton: {
    backgroundColor: '#4A7AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#C5D1E8',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderWidth: 0,
  },
  inputAndroid: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderWidth: 0,
  },
  placeholder: {
    color: '#999',
  },
});

export default ReportProblemScreen;