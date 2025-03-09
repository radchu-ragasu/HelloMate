import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const AccessScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Help & Support</Text>
      <Text style={styles.description}>
        Experiencing an issue? Let us know, and we’ll fix it!
      </Text>
      <Button
        title="Report a Problem"
        onPress={() => navigation.navigate('ReportProblemScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default AccessScreen;