import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const ReportProblemScreen = ({ navigation }: { navigation: any }) => {
  const [category, setCategory] = useState('Bug');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (!description) {
      // Alert.alert('Error', 'Please describe the problem');
      navigation.navigate('ErrorScreen');
      return;
    }
    console.log('Report submitted:', { category, description, email });
    navigation.navigate('ConfirmationScreen');
  };


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Report a Problem</Text>
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
      />
      <TextInput
        style={styles.input}
        multiline
        placeholder="Describe the problem in detail..."
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Your email (optional)"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginBottom: 20,
  },
});

export default ReportProblemScreen; // Ensure this is the default export