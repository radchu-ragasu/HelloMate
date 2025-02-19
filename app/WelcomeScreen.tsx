import { Link } from 'expo-router';
import { View, Text, StyleSheet, Image } from 'react-native';

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('./assets/images/logo.jpg')} // Replace with your logo path
        style={styles.logo} 
        resizeMode="contain" // Or "cover", depending on your logo
      />
      <Text style={styles.title}>Welcome to HelloMate!</Text>
      <Text style={styles.subtitle}>Connecting you with the best services.</Text> {/* Add a subtitle */}

      <View style={styles.buttonContainer}> {/* Container for buttons */}
        <Link href="/auth/login" style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </Link>
        <Link href="/CreateAccount" style={styles.button}>
          <Text style={styles.buttonText}>Sign up</Text>
        </Link>
      </View>

      <Text style={styles.footer}>© 2023 HelloMate. All rights reserved.</Text> {/* Add a footer */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8', // Light background color
  },
  logo: {
    width: 200, // Adjust size as needed
    height: 100, // Adjust size as needed
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333', // Darker text color
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    color: '#666', // Slightly lighter text color
  },
  buttonContainer: {
    flexDirection: 'column', // Arrange buttons vertically
    width: '50%', // Make buttons take up most of the width

  },
  button: {
    backgroundColor: '#ADD8E6', // Blue button color
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,  // Spacing between buttons
    alignItems: 'center',
    textAlign: 'center',
    elevation: 5, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 30,
    fontSize: 14,
    color: '#999',
  },
});

export default WelcomeScreen;