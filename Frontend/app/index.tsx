//welcomescreen

import React, { useState } from "react";
import {View, Text, StyleSheet} from "react-native";
import WelcomeScreen from "./WelcomeScreen";
import {ref, set} from 'firebase/database';
import ServiceProviderSignup from "./BusinessOwnerSignup";
import BusinessOwnerSignup from "./BusinessOwnerSignup";


export default function App() {
  return (
    <WelcomeScreen></WelcomeScreen>
  );
}