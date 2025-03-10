import React, { useState } from 'react';
import { Link } from 'expo-router';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

// Translations object with English, Sinhala and Tamil
const translations = {
  en: {
    welcome: "Welcome to HelloMate!",
    subtitle: "Connecting you with the best services.",
    login: "Login",
    signup: "Sign up",
    footer: "© 2023 HelloMate. All rights reserved.",
    language: "Language"
  },
  si: {
    welcome: "HelloMate වෙත සාදරයෙන් පිළිගනිමු!",
    subtitle: "ඔබව හොඳම සේවාවන් සමඟ සම්බන්ධ කරයි.",
    login: "පිවිසෙන්න",
    signup: "ලියාපදිංචි වන්න",
    footer: "© 2023 HelloMate. සියලුම හිමිකම් ඇවිරිණි.",
    language: "භාෂාව"
  },
  ta: {
    welcome: "HelloMate க்கு வரவேற்கிறோம்!",
    subtitle: "சிறந்த சேவைகளுடன் உங்களை இணைக்கிறது.",
    login: "உள்நுழைக",
    signup: "பதிவு செய்க",
    footer: "© 2023 HelloMate. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    language: "மொழி"
  }
};

const WelcomeScreen = () => {
  // State to keep track of selected language
  const [language, setLanguage] = useState('en');
  
  // Get current translations based on selected language
  const t = translations[language];
  
  // Function to toggle between languages
  const changeLanguage = () => {
    if (language === 'en') {
      setLanguage('si');
    } else if (language === 'si') {
      setLanguage('ta');
    } else {
      setLanguage('en');
    }
  };
  
  return (
    <View style={styles.container}>
      {/* Language selector */}
      <TouchableOpacity 
        style={styles.languageSelector} 
        onPress={changeLanguage}
      >
        <Text style={styles.languageText}>{t.language}: {language.toUpperCase()}</Text>
      </TouchableOpacity>
      
      <Image
        source={require('./assets/images/logo.jpg')} // Replace with your logo path
        style={styles.logo}
        resizeMode="contain" // Or "cover", depending on your logo
      />
      
      <Text style={styles.title}>{t.welcome}</Text>
      <Text style={styles.subtitle}>{t.subtitle}</Text>
      
      <View style={styles.buttonContainer}>
        <Link href="/auth/login" style={styles.button}>
          <Text style={styles.buttonText}>{t.login}</Text>
        </Link>
        <Link href="/CreateAccount" style={styles.button}>
          <Text style={styles.buttonText}>{t.signup}</Text>
        </Link>
      </View>
      
      <Text style={styles.footer}>{t.footer}</Text>
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
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    color: '#666', // Slightly lighter text color
    textAlign: 'center',
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
    marginVertical: 10, // Spacing between buttons
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
    textAlign: 'center',
  },
  languageSelector: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(173, 216, 230, 0.3)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  languageText: {
    fontSize: 14,
    color: '#333',
  },
});

export default WelcomeScreen;
