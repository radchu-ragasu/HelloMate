import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { AuthProvider } from "./src/context/AuthContext"
import ProfileScreen from "./src/screens/ProfileScreen"
import EditPhotoScreen from "./src/screens/EditPhotoScreen"
import EditNameScreen from "./src/screens/EditNameScreen"

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Profile"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="EditPhoto" component={EditPhotoScreen} />
            <Stack.Screen name="EditName" component={EditNameScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  )
}

