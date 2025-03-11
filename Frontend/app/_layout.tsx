import { Stack } from "expo-router";

export default function RootLayout() {
  return (
        <Stack screenOptions={{headerShown: false}}>
          <Stack.Screen name="orderScreen" />
          <Stack.Screen name="orderScreen1" />
    
        </Stack>
          );
}
